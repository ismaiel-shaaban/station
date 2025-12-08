"use client";
import { getCountriesCodeService } from "@/redux/services/generalService";
import { useTranslation } from "@/utils/useTranslation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createMemberService } from "@/redux/services/admins";

const AddUserLayer = () => {
  const [selectedCode, setSelectedCode] = useState(1); // Default to Saudi Arabia
  const { $t } = useTranslation();
  const router = useRouter();
  const { countriesCode } = useSelector((state) => state.general);
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    dispatch(getCountriesCodeService());
  }, [dispatch]);

  // Validation Schema
  const schema = yup.object({
    userName: yup
      .string()
      .required("الاسم مطلوب"),

    password: yup
      .string()
      .required($t("PasswordRequired"))
      .min(6, $t("PasswordMinLength")),
    phone: yup
      .string()
      .required("رقم الهاتف مطلوب"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const payload = {
      userName: data.userName,
      password: data.password,
      phone: data.phone,

    };

    try {
      const response = await dispatch(createMemberService(payload)).unwrap();
      toast.success($t("AddSuccess"));
      router.push("/dashboard/admins");
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      if (error.data) {
        toast.error(` ${error.data.message || $t("SomethingWentWrong")}`);
      } else {
        toast.error("An unexpected error occurred.");
      }
      setIsLoading(false);
    }
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
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="userName"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          {$t("اسم المستخدم")}
                          <span className="text-danger-600">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control radius-8 ${errors.userName ? "is-invalid" : ""
                            }`}
                          id="userName"
                          placeholder={$t("اكتب اسم المستخدم")}
                          {...register("userName")}
                        />
                        <div className="invalid-feedback">
                          {errors.userName?.message}
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="phone"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          {$t("Phone")}
                          <span className="text-danger-600">*</span>
                        </label>
                        <div className="d-flex gap-1">
                          <div></div>
                          <Form.Control
                            className={`form-control w-100 ${errors.phone ? "is-invalid" : ""
                              }`}
                            placeholder={$t("EnterPhoneNumber")}
                            name="phone"
                            type="text"
                            {...register("phone")}
                          />
                        </div>
                        <div className="invalid-feedback">
                          {errors.phone?.message}
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6 position-relative">
                      <label
                        htmlFor="password"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        {$t("Password")} <span className="text-danger-600">*</span>
                      </label>
                      <div className="position-relative">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          className={`form-control radius-8 ${errors.password ? "is-invalid" : ""
                            }`}
                          id="password"
                          placeholder={$t("Password")}
                          name="password"
                          {...register("password")}
                        />
                        <span
                          className={`toggle-password ${passwordVisible ? "ri-eye-off-line" : "ri-eye-line"
                            } cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                          onClick={togglePasswordVisibility}
                        ></span>
                        <div className="invalid-feedback">
                          {errors.password?.message}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-center gap-3 mt-20">
                    <button
                      onClick={() => router.push("/dashboard/admins")}
                      type="button"
                      className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                    >
                      {$t("Cancel")}
                    </button>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="btn  btn-primary-600 border border-primary-600 text-md px-56 py-12 radius-8"
                    >
                      {isLoading ? 'جار الحفظ..' : $t("Save")}
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
};

export default AddUserLayer;