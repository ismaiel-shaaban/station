"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import { useTranslation } from "@/utils/useTranslation";
import {
  createMerchantService,
  updateMerchantService,
  getMerchantAuthoritiesService,
} from "@/redux/services/merchants";

export default function MerchantForm({ isEdit = false, merchant = null, onClose }) {
  const { $t } = useTranslation();
  const dispatch = useDispatch();
  const { authoritiesList, isLoading } = useSelector((state) => state.merchants);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    merchant: {
      name: "",
      logo: "",
      code: "",
      phone: "",
      mainColor: "#000000",
    },
    authorities: [],
  });

  useEffect(() => {
    dispatch(getMerchantAuthoritiesService());
    if (isEdit && merchant) {
      setFormData({
        username: merchant.username || "",
        password: "",
        merchant: {
          name: merchant.merchant?.name || "",
          logo: merchant.merchant?.logo || "",
          code: merchant.merchant?.code || "",
          phone: merchant.merchant?.phone || "",
          mainColor: merchant.merchant?.mainColor || "#000000",
        },
        authorities: merchant.authorities || [],
      });
    }
  }, [dispatch, isEdit, merchant]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("merchant.")) {
      const merchantField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        merchant: {
          ...prev.merchant,
          [merchantField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAuthorityChange = (authorityId) => {
    setFormData((prev) => ({
      ...prev,
      authorities: prev.authorities.includes(authorityId)
        ? prev.authorities.filter((id) => id !== authorityId)
        : [...prev.authorities, authorityId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await dispatch(updateMerchantService({ id: merchant.id, data: formData })).unwrap();
        toast.success("تم تحديث المتجر بنجاح");
      } else {
        await dispatch(createMerchantService(formData)).unwrap();
        toast.success("تم إضافة المتجر بنجاح");
      }
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "فشلت العملية");
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999
      }}
      onClick={onClose}
    >
      <div 
        className="modal-content" 
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          width: "600px",
          maxWidth: "90%",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
          zIndex: 10000
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header" style={{ borderBottom: "1px solid #dee2e6", padding: "1rem" }}>
          <h5 className="modal-title">
            {isEdit ? "تعديل المتجر" : "إضافة متجر جديد"}
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ padding: "1rem" }}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold text-primary-light text-sm mb-8">اسم المستخدم</label>
              <input
                type="text"
                className="form-control radius-8"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                placeholder="أدخل اسم المستخدم"
              />
            </div>
            {!isEdit && (
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold text-primary-light text-sm mb-8">كلمة المرور</label>
                <input
                  type="password"
                  className="form-control radius-8"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="أدخل كلمة المرور"
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="merchant.name" className="form-label fw-semibold text-primary-light text-sm mb-8">اسم المتجر</label>
              <input
                type="text"
                className="form-control radius-8"
                id="merchant.name"
                name="merchant.name"
                value={formData.merchant.name}
                onChange={handleInputChange}
                required
                placeholder="أدخل اسم المتجر"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="merchant.code" className="form-label fw-semibold text-primary-light text-sm mb-8">رمز المتجر</label>
              <input
                type="text"
                className="form-control radius-8"
                id="merchant.code"
                name="merchant.code"
                value={formData.merchant.code}
                onChange={handleInputChange}
                required
                placeholder="أدخل رمز المتجر"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="merchant.phone" className="form-label fw-semibold text-primary-light text-sm mb-8">رقم الهاتف</label>
              <input
                type="tel"
                className="form-control radius-8"
                id="merchant.phone"
                name="merchant.phone"
                value={formData.merchant.phone}
                onChange={handleInputChange}
                required
                placeholder="أدخل رقم الهاتف"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="merchant.logo" className="form-label fw-semibold text-primary-light text-sm mb-8">شعار المتجر</label>
              <input
                type="text"
                className="form-control radius-8"
                id="merchant.logo"
                name="merchant.logo"
                value={formData.merchant.logo}
                onChange={handleInputChange}
                required
                placeholder="أدخل رابط الشعار"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="merchant.mainColor" className="form-label fw-semibold text-primary-light text-sm mb-8">اللون الرئيسي</label>
              <div className="d-flex gap-2 align-items-center">
                <input
                  type="color"
                  className="form-control form-control-color radius-8"
                  id="merchant.mainColor"
                  name="merchant.mainColor"
                  value={formData.merchant.mainColor}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  className="form-control radius-8"
                  value={formData.merchant.mainColor}
                  onChange={handleInputChange}
                  name="merchant.mainColor"
                  placeholder="#000000"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold text-primary-light text-sm mb-8">الصلاحيات</label>
              <div className="d-flex flex-column gap-2">
                {authoritiesList?.map((authority) => (
                  <div key={authority.id} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`authority-${authority.id}`}
                      checked={formData.authorities.includes(authority.id)}
                      onChange={() => handleAuthorityChange(authority.id)}
                    />
                    <label className="form-check-label" htmlFor={`authority-${authority.id}`}>
                      {authority.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer" style={{ borderTop: "1px solid #dee2e6", padding: "1rem", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
            <button
              type="button"
              className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
              onClick={onClose}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="btn btn-primary-600 border border-primary-600 text-md px-24 py-12 radius-8"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="d-flex align-items-center gap-2">
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  جاري الحفظ...
                </span>
              ) : (
                "حفظ"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 