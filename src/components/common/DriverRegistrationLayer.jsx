"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { publicAxiosInstance } from "@/app/libs/axiosInstance";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

// Static array of Iraq governorates
const IRAQ_GOVERNORATES = [
  { id: 1, name: "بغداد" },
  { id: 2, name: "البصرة" },
  { id: 3, name: "الموصل" },
  { id: 4, name: "أربيل" },
  { id: 5, name: "كركوك" },
  { id: 6, name: "السليمانية" },
  { id: 7, name: "دهوك" },
  { id: 8, name: "الأنبار" },
  { id: 9, name: "كربلاء" },
  { id: 10, name: "النجف" },
  { id: 11, name: "بابل" },
  { id: 12, name: "واسط" },
  { id: 13, name: "ديالى" },
  { id: 14, name: "ميسان" },
  { id: 15, name: "ذي قار" },
  { id: 16, name: "المثنى" },
  { id: 17, name: "صلاح الدين" },
];

const DriverRegistrationLayer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreviews, setPhotoPreviews] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Full validation schema for final submission
  const fullSchema = yup.object({
    // Step 1 fields
    fullName: yup.string().required("الاسم الثلاثي مع اللقب مطلوب"),
    dateOfBirth: yup.string().required("تاريخ الميلاد مطلوب"),
    phone: yup.string().required("رقم الهاتف مطلوب"),
    governorate: yup.string().required("المحافظة مطلوبة"),
    address: yup.string().required("العنوان مطلوب"),
    personalPhoto: yup.string().required("صورة شخصية مطلوبة"),
    idPhoto: yup.string().required("صورة البطاقة الموحدة من الأمام مطلوبة"),
    idBackPhoto: yup.string().required("صورة البطاقة الموحدة من الخلف مطلوبة"),
    drivingLicensePhoto: yup.string().required("صورة إجازة السوق من الأمام مطلوبة"),
    drivingLicenseBackPhoto: yup.string().required("صورة إجازة السوق من الخلف مطلوبة"),
    availabilityHours: yup.string().required("ساعات التوفر مطلوبة"),
    // Step 2 fields
    vehicleCategory: yup.string().required("نوع المركبة مطلوب"),
    vehicleModel: yup.string().required("نوع المركبة (الموديل) مطلوب"),
    vehicleCapacity: yup.number().typeError("سعة المركبة يجب أن تكون رقم").required("سعة المركبة مطلوبة").min(1, "سعة المركبة يجب أن تكون أكبر من 0"),
    carNumber: yup.string().required("رقم المركبة (لوحة المركبة) مطلوب"),
  
    carColor: yup.string().required("لون المركبة مطلوب"),
    vehicleFrontPhoto: yup.string().required("صورة المركبة من الأمام مطلوبة"),
    vehicleBackPhoto: yup.string().required("صورة المركبة من الخلف مطلوبة"),
    vehicleInteriorPhoto: yup.string().required("صورة المركبة من الداخل مطلوبة"),
    annualInsurancePhoto: yup.string().required("صورة السنوية من الأمام مطلوبة"),
    annualInsuranceBackPhoto: yup.string().required("صورة السنوية من الخلف مطلوبة"),
   
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(fullSchema),
    mode: "onChange",
  });

  // Handle file upload
  const handleFileUpload = async (file, fieldName) => {
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreviews((prev) => ({
        ...prev,
        [fieldName]: reader.result,
      }));
    };
    reader.readAsDataURL(file);

    // Upload file
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await publicAxiosInstance.post("/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setValue(fieldName, response.data.name);
      return response.data.name;
    } catch (error) {
      toast.error(`حدث خطأ أثناء رفع ${fieldName}`);
      setPhotoPreviews((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[fieldName];
        return newPreviews;
      });
      throw error;
    }
  };

  const handleFileChange = async (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      await handleFileUpload(file, fieldName);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Set empty strings for optional image fields that are not provided
      const imageFields = [
        "personalPhoto",
        "idPhoto",
        "idBackPhoto",
        "drivingLicensePhoto",
        "drivingLicenseBackPhoto",
        "vehicleFrontPhoto",
        "vehicleBackPhoto",
        "vehicleInteriorPhoto",
        "annualInsurancePhoto",
        "annualInsuranceBackPhoto",
      ];
      
      const formData = { ...data };
      imageFields.forEach((field) => {
        if (!formData[field]) {
          formData[field] = "";
        }
      });

      await publicAxiosInstance.post("/driver/form", formData);
      
      // Reset form
      reset();
      setPhotoPreviews({});
      setCurrentStep(1);
      
      // Show success message
      setShowSuccessMessage(true);
      toast.success("تم تسجيل السائق بنجاح");
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء التسجيل");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    const step1Fields = [
      "fullName",
      "dateOfBirth",
      "phone",
      "governorate",
      "address",
      "personalPhoto",
      "idPhoto",
      "idBackPhoto",
      "drivingLicensePhoto",
      "drivingLicenseBackPhoto",
      "availabilityHours",
    ];
    const isValid = await trigger(step1Fields);
    if (isValid) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("يرجى ملء جميع الحقول المطلوبة في الخطوة الأولى");
    }
  };

  const handlePrevious = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="auth bg-base d-flex flex-wrap overflow-hidden justify-content-center py-20">
      <div className="auth-right py-0 px-24 h-100 d-flex flex-column justify-content-center">
        <div className="max-w-900-px w-100 mx-auto">
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="card border mb-24 bg-success-50">
              <div className="card-body p-24 text-center">
                <Icon icon="mdi:check-circle" style={{ fontSize: "64px", color: "var(--success-600)", marginBottom: "16px" }} />
                <h4 className="mb-12 text-success-600">شكراً لك!</h4>
                <p className="mb-0 text-lg text-success-600">
                  تم تسجيل بياناتك بنجاح. سنقوم بمراجعة طلبك والاتصال بك قريباً.
                </p>
              </div>
            </div>
          )}

          <div className="d-flex flex-column justify-content-center align-items-center mb-20">
            <Link href="/" className="mb-10 d-flex justify-content-center">
              <img src="/assets/images/logo.png" className="w-160-px" alt="Logo" />
            </Link>
            <h4 className="mb-12">تسجيل السائق</h4>
            <p className="mb-32 text-secondary-light text-lg text-center">
              يرجى ملء جميع الحقول المطلوبة للتسجيل
            </p>
          </div>

          {/* Progress Steps */}
          <div className="card border mb-24">
            <div className="card-body p-24">
              <div className="d-flex align-items-center justify-content-between position-relative">
                {/* Progress Line */}
                <div
                  className="position-absolute w-100"
                  style={{
                    height: "3px",
                    backgroundColor: "var(--neutral-200)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 0,
                  }}
                >
                  <div
                    className="bg-primary-600"
                    style={{
                      height: "100%",
                      width: currentStep === 1 ? "50%" : "100%",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>

                {/* Step 1 */}
                <div className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 1 }}>
                  <div
                    className={`d-flex align-items-center justify-content-center rounded-circle mb-8 ${
                      currentStep >= 1 ? "bg-primary-600 text-white" : "bg-neutral-200 text-secondary-light"
                    }`}
                    style={{ width: "50px", height: "50px", fontSize: "20px", fontWeight: "bold" }}
                  >
                    {currentStep > 1 ? <Icon icon="mdi:check" style={{ fontSize: "24px" }} /> : "1"}
                  </div>
                  <span className={`text-sm fw-semibold ${currentStep >= 1 ? "text-primary-600" : "text-secondary-light"}`}>
                    معلومات السائق
                  </span>
                </div>

                {/* Step 2 */}
                <div className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 1 }}>
                  <div
                    className={`d-flex align-items-center justify-content-center rounded-circle mb-8 ${
                      currentStep >= 2 ? "bg-primary-600 text-white" : "bg-neutral-200 text-secondary-light"
                    }`}
                    style={{ width: "50px", height: "50px", fontSize: "20px", fontWeight: "bold" }}
                  >
                    2
                  </div>
                  <span className={`text-sm fw-semibold ${currentStep >= 2 ? "text-primary-600" : "text-secondary-light"}`}>
                    معلومات المركبة
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card border">
            <div className="card-body p-24">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Step 1: معلومات السائق */}
                {currentStep === 1 && (
                  <div className="mb-40" style={{ animation: "fadeIn 0.3s ease" }}>
                  <h5 className="mb-24 text-primary-600 fw-semibold border-bottom pb-12">
                    معلومات السائق
                  </h5>
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <label htmlFor="fullName" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        الاسم الثلاثي مع اللقب <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control radius-8 ${errors.fullName ? "is-invalid" : ""}`}
                        id="fullName"
                        placeholder="الاسم الثلاثي مع اللقب"
                        {...register("fullName")}
                      />
                      <div className="invalid-feedback">{errors.fullName?.message}</div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="dateOfBirth" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        تاريخ الميلاد (العمر) <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="date"
                        className={`form-control radius-8 ${errors.dateOfBirth ? "is-invalid" : ""}`}
                        id="dateOfBirth"
                        {...register("dateOfBirth")}
                      />
                      <div className="invalid-feedback">{errors.dateOfBirth?.message}</div>
                    </div>

                    <div className="col-md-6">
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

                    <div className="col-md-6">
                      <label htmlFor="governorate" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        المحافظة <span className="text-danger-600">*</span>
                      </label>
                      <select
                        className={`form-select radius-8 ${errors.governorate ? "is-invalid" : ""}`}
                        id="governorate"
                        {...register("governorate")}
                      >
                        <option value="">اختر المحافظة</option>
                        {IRAQ_GOVERNORATES.map((gov) => (
                          <option key={gov.id} value={gov.id}>
                            {gov.name}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">{errors.governorate?.message}</div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="address" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        العنوان <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control radius-8 ${errors.address ? "is-invalid" : ""}`}
                        id="address"
                        placeholder="العنوان"
                        {...register("address")}
                      />
                      <div className="invalid-feedback">{errors.address?.message}</div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="personalPhoto" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        صورة شخصية <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="file"
                        className={`form-control radius-8 ${errors.personalPhoto ? "is-invalid" : ""}`}
                        id="personalPhoto"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "personalPhoto")}
                      />
                      {photoPreviews.personalPhoto && (
                        <div className="mt-2">
                          <img
                            src={photoPreviews.personalPhoto}
                            alt="Preview"
                            className="img-thumbnail"
                            style={{ maxHeight: "100px" }}
                          />
                        </div>
                      )}
                      <div className="invalid-feedback">{errors.personalPhoto?.message}</div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="idPhoto" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        صورة البطاقة الموحدة من الامام <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="file"
                        className={`form-control radius-8 ${errors.idPhoto ? "is-invalid" : ""}`}
                        id="idPhoto"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "idPhoto")}
                      />
                      {photoPreviews.idPhoto && (
                        <div className="mt-2">
                          <img
                            src={photoPreviews.idPhoto}
                            alt="Preview"
                            className="img-thumbnail"
                            style={{ maxHeight: "100px" }}
                          />
                        </div>
                      )}
                      <div className="invalid-feedback">{errors.idPhoto?.message}</div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="idBackPhoto" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        صورة البطاقة الموحدة من الخلف <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="file"
                        className={`form-control radius-8 ${errors.idBackPhoto ? "is-invalid" : ""}`}
                        id="idBackPhoto"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "idBackPhoto")}
                      />
                      {photoPreviews.idBackPhoto && (
                        <div className="mt-2">
                          <img
                            src={photoPreviews.idBackPhoto}
                            alt="Preview"
                            className="img-thumbnail"
                            style={{ maxHeight: "100px" }}
                          />
                        </div>
                      )}
                      <div className="invalid-feedback">{errors.idBackPhoto?.message}</div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="drivingLicensePhoto" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        صورة اجازة السوق من الامام <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="file"
                        className={`form-control radius-8 ${errors.drivingLicensePhoto ? "is-invalid" : ""}`}
                        id="drivingLicensePhoto"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "drivingLicensePhoto")}
                      />
                      {photoPreviews.drivingLicensePhoto && (
                        <div className="mt-2">
                          <img
                            src={photoPreviews.drivingLicensePhoto}
                            alt="Preview"
                            className="img-thumbnail"
                            style={{ maxHeight: "100px" }}
                          />
                        </div>
                      )}
                      <div className="invalid-feedback">{errors.drivingLicensePhoto?.message}</div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="drivingLicenseBackPhoto" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        صورة اجازة السوق من الخلف <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="file"
                        className={`form-control radius-8 ${errors.drivingLicenseBackPhoto ? "is-invalid" : ""}`}
                        id="drivingLicenseBackPhoto"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "drivingLicenseBackPhoto")}
                      />
                      {photoPreviews.drivingLicenseBackPhoto && (
                        <div className="mt-2">
                          <img
                            src={photoPreviews.drivingLicenseBackPhoto}
                            alt="Preview"
                            className="img-thumbnail"
                            style={{ maxHeight: "100px" }}
                          />
                        </div>
                      )}
                      <div className="invalid-feedback">{errors.drivingLicenseBackPhoto?.message}</div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="availabilityHours" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        ساعات التوفر (صباحا-مساء-دائما) <span className="text-danger-600">*</span>
                      </label>
                      <select
                        className={`form-select radius-8 ${errors.availabilityHours ? "is-invalid" : ""}`}
                        id="availabilityHours"
                        {...register("availabilityHours")}
                      >
                        <option value="">اختر ساعات التوفر</option>
                        <option value="MORNING">صباحاً</option>
                        <option value="EVENING">مساءً</option>
                        <option value="ALWAYS">دائماً</option>
                      </select>
                      <div className="invalid-feedback">{errors.availabilityHours?.message}</div>
                    </div>
                  </div>
                </div>
                )}

                {/* Step 2: معلومات المركبة */}
                {currentStep === 2 && (
                  <div className="mb-40" style={{ animation: "fadeIn 0.3s ease" }}>
                    <h5 className="mb-24 text-primary-600 fw-semibold border-bottom pb-12">
                      معلومات المركبة
                    </h5>
                    <div className="row gy-3">
                    <div className="col-md-6">
                      <label htmlFor="vehicleCategory" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        نوع المركبة (خصوصي - مواصلات) <span className="text-danger-600">*</span>
                      </label>
                      <select
                        className={`form-select radius-8 ${errors.vehicleCategory ? "is-invalid" : ""}`}
                        id="vehicleCategory"
                        {...register("vehicleCategory")}
                      >
                        <option value="">اختر نوع المركبة</option>
                        <option value="PRIVATE">خصوصي</option>
                        <option value="TRANSPORT ">مواصلات</option>
                      </select>
                      <div className="invalid-feedback">{errors.vehicleCategory?.message}</div>
                    </div>

              

                    <div className="col-md-6">
                      <label htmlFor="vehicleModel" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        نوع المركبة (الموديل) <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control radius-8 ${errors.vehicleModel ? "is-invalid" : ""}`}
                        id="vehicleModel"
                        placeholder="نوع المركبة (الموديل)"
                        {...register("vehicleModel")}
                      />
                      <div className="invalid-feedback">{errors.vehicleModel?.message}</div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="vehicleCapacity" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        سعة المركبة <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        className={`form-control radius-8 ${errors.vehicleCapacity ? "is-invalid" : ""}`}
                        id="vehicleCapacity"
                        placeholder="سعة المركبة"
                        {...register("vehicleCapacity")}
                      />
                      <div className="invalid-feedback">{errors.vehicleCapacity?.message}</div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="carNumber" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        رقم المركبة (لوحة المركبة) <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control radius-8 ${errors.carNumber ? "is-invalid" : ""}`}
                        id="carNumber"
                        placeholder="رقم المركبة"
                        {...register("carNumber")}
                      />
                      <div className="invalid-feedback">{errors.carNumber?.message}</div>
                    </div>

                  

                    <div className="col-md-6">
                      <label htmlFor="carColor" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        لون المركبة <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control radius-8 ${errors.carColor ? "is-invalid" : ""}`}
                        id="carColor"
                        placeholder="لون المركبة"
                        {...register("carColor")}
                      />
                      <div className="invalid-feedback">{errors.carColor?.message}</div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="vehicleFrontPhoto" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        صورة المركبة من الأمام <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="file"
                        className={`form-control radius-8 ${errors.vehicleFrontPhoto ? "is-invalid" : ""}`}
                        id="vehicleFrontPhoto"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "vehicleFrontPhoto")}
                      />
                      {photoPreviews.vehicleFrontPhoto && (
                        <div className="mt-2">
                          <img
                            src={photoPreviews.vehicleFrontPhoto}
                            alt="Preview"
                            className="img-thumbnail"
                            style={{ maxHeight: "100px" }}
                          />
                        </div>
                      )}
                      <div className="invalid-feedback">{errors.vehicleFrontPhoto?.message}</div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="vehicleBackPhoto" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        صورة المركبة من الخلف <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="file"
                        className={`form-control radius-8 ${errors.vehicleBackPhoto ? "is-invalid" : ""}`}
                        id="vehicleBackPhoto"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "vehicleBackPhoto")}
                      />
                      {photoPreviews.vehicleBackPhoto && (
                        <div className="mt-2">
                          <img
                            src={photoPreviews.vehicleBackPhoto}
                            alt="Preview"
                            className="img-thumbnail"
                            style={{ maxHeight: "100px" }}
                          />
                        </div>
                      )}
                      <div className="invalid-feedback">{errors.vehicleBackPhoto?.message}</div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="vehicleInteriorPhoto" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        صورة المركبة من الداخل <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="file"
                        className={`form-control radius-8 ${errors.vehicleInteriorPhoto ? "is-invalid" : ""}`}
                        id="vehicleInteriorPhoto"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "vehicleInteriorPhoto")}
                      />
                      {photoPreviews.vehicleInteriorPhoto && (
                        <div className="mt-2">
                          <img
                            src={photoPreviews.vehicleInteriorPhoto}
                            alt="Preview"
                            className="img-thumbnail"
                            style={{ maxHeight: "100px" }}
                          />
                        </div>
                      )}
                      <div className="invalid-feedback">{errors.vehicleInteriorPhoto?.message}</div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="annualInsurancePhoto" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        صورة السنوية من الامام <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="file"
                        className={`form-control radius-8 ${errors.annualInsurancePhoto ? "is-invalid" : ""}`}
                        id="annualInsurancePhoto"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "annualInsurancePhoto")}
                      />
                      {photoPreviews.annualInsurancePhoto && (
                        <div className="mt-2">
                          <img
                            src={photoPreviews.annualInsurancePhoto}
                            alt="Preview"
                            className="img-thumbnail"
                            style={{ maxHeight: "100px" }}
                          />
                        </div>
                      )}
                      <div className="invalid-feedback">{errors.annualInsurancePhoto?.message}</div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="annualInsuranceBackPhoto" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        صورة السنوية من الخلف <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="file"
                        className={`form-control radius-8 ${errors.annualInsuranceBackPhoto ? "is-invalid" : ""}`}
                        id="annualInsuranceBackPhoto"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "annualInsuranceBackPhoto")}
                      />
                      {photoPreviews.annualInsuranceBackPhoto && (
                        <div className="mt-2">
                          <img
                            src={photoPreviews.annualInsuranceBackPhoto}
                            alt="Preview"
                            className="img-thumbnail"
                            style={{ maxHeight: "100px" }}
                          />
                        </div>
                      )}
                      <div className="invalid-feedback">{errors.annualInsuranceBackPhoto?.message}</div>
                    </div>
                  </div>
                </div>
                )}

                {/* Navigation Buttons */}
                <div className="d-flex align-items-center justify-content-between gap-3 mt-32">
                  {currentStep === 1 ? (
                    <div></div>
                  ) : (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="btn btn-outline-primary-600 border border-primary-600 text-primary-600 text-md px-56 py-12 radius-8"
                    >
                      <Icon icon="mdi:arrow-right" className="ms-2" />
                      السابق
                    </button>
                  )}

                  {currentStep === 1 ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleNext(e);
                      }}
                      className="btn btn-primary-600 border border-primary-600 text-md px-56 py-12 radius-8"
                    >
                      التالي
                      <Icon icon="mdi:arrow-left" className="me-2" />
                    </button>
                  ) : (
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="btn btn-primary-600 border border-primary-600 text-md px-56 py-12 radius-8"
                    >
                      {isLoading ? "جار التسجيل.." : "تسجيل"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriverRegistrationLayer;

