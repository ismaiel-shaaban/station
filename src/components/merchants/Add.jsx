"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createMerchantService, getMerchantTypesService } from "@/redux/services/merchants";
import { uploadFileService } from "@/redux/services/generalService";

export default function AddMerchant() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const { merchantTypesList } = useSelector((state) => state.merchants);

  useEffect(() => {
    dispatch(getMerchantTypesService());
  }, [dispatch]);

  const schema = yup.object({
    username: yup.string().required("اسم المستخدم مطلوب"),
    password: yup
      .string()
      .required("كلمة المرور مطلوبة")
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف أو أكثر"),
    name: yup.string().required("اسم المتجر مطلوب"),
    phone: yup.string().required("رقم الهاتف مطلوب"),
    logo: yup.string().required("شعار المتجر مطلوب"),
    merchantTypeId: yup.string().required("نوع المتجر مطلوب"),
    profitPercentage: yup.number().typeError("نسبة الربح يجب أن تكون رقم").required("نسبة الربح مطلوبة").min(0, "نسبة الربح يجب أن تكون أكبر من أو تساوي 0"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload file
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await dispatch(uploadFileService({formData , bucketName: "merchants"})).unwrap();
        setValue("logo", response.name);
      } catch (error) {
        toast.error(error?.data?.message || "حدث خطأ أثناء رفع الشعار");
        setLogoPreview(null);
      }
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(createMerchantService(data)).unwrap();
      toast.success("تمت إضافة المتجر بنجاح");
      setTimeout(() => {
        router.push("/dashboard/merchants");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "حدث خطأ أثناء الإضافة");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-body p-24">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-xl-8 col-lg-10">
            <div className="card border">
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-sm-6 mb-20">
                      <label htmlFor="username" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        اسم المستخدم <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control radius-8 ${errors.username ? "is-invalid" : ""}`}
                        id="username"
                        placeholder="اسم المستخدم"
                        {...register("username")}
                      />
                      <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    <div className="col-sm-6 mb-20 position-relative">
                      <label htmlFor="password" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        كلمة المرور <span className="text-danger-600">*</span>
                      </label>
                      <div className="position-relative">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          className={`form-control radius-8 ${errors.password ? "is-invalid" : ""}`}
                          id="password"
                          placeholder="كلمة المرور"
                          {...register("password")}
                        />
                        <span
                          className={`toggle-password ${passwordVisible ? "ri-eye-off-line" : "ri-eye-line"} cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        ></span>
                        <div className="invalid-feedback">{errors.password?.message}</div>
                      </div>
                    </div>
                    <div className="col-sm-6 mb-20">
                      <label htmlFor="name" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        اسم المتجر <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control radius-8 ${errors.name ? "is-invalid" : ""}`}
                        id="name"
                        placeholder="اسم المتجر"
                        {...register("name")}
                      />
                      <div className="invalid-feedback">{errors.name?.message}</div>
                    </div>
                    <div className="col-sm-6 mb-20">
                      <label htmlFor="phone" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        رقم الهاتف <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="tel"
                        className={`form-control radius-8 ${errors.phone ? "is-invalid" : ""}`}
                        id="phone"
                        placeholder="رقم الهاتف"
                        {...register("phone")}
                      />
                      <div className="invalid-feedback">{errors.phone?.message}</div>
                    </div>
                    <div className="col-sm-6 mb-20">
                      <label htmlFor="logo" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        شعار المتجر <span className="text-danger-600">*</span>
                      </label>
                      <div className="d-flex flex-column gap-2">
                        <input
                          type="file"
                          className={`form-control radius-8 ${errors.logo ? "is-invalid" : ""}`}
                          id="logo"
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                        {logoPreview && (
                          <div className="mt-2">
                            <img src={logoPreview} alt="Logo Preview" className="img-thumbnail" style={{ maxHeight: "100px" }} />
                          </div>
                        )}
                      </div>
                      <div className="invalid-feedback">{errors.logo?.message}</div>
                    </div>
                    <div className="col-sm-6 mb-20">
                      <label htmlFor="merchantTypeId" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        نوع المتجر <span className="text-danger-600">*</span>
                      </label>
                      <select
                        className={`form-select radius-8 ${errors.merchantTypeId ? "is-invalid" : ""}`}
                        id="merchantTypeId"
                        {...register("merchantTypeId")}
                      >
                        <option value="">اختر نوع المتجر</option>
                        {merchantTypesList?.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">{errors.merchantTypeId?.message}</div>
                    </div>
                    <div className="col-sm-6 mb-20">
                      <label htmlFor="profitPercentage" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        نسبة الربح <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className={`form-control radius-8 ${errors.profitPercentage ? "is-invalid" : ""}`}
                        id="profitPercentage"
                        placeholder="نسبة الربح"
                        {...register("profitPercentage")}
                      />
                      <div className="invalid-feedback">{errors.profitPercentage?.message}</div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-3 mt-20">
                    <button
                      onClick={() => router.push("/dashboard/merchants")}
                      type="button"
                      className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                    >
                      إلغاء
                    </button>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="btn btn-primary-600 border border-primary-600 text-md px-56 py-12 radius-8"
                    >
                      {isLoading ? "جار الحفظ.." : "حفظ"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
