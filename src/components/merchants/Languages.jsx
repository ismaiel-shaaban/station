"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  getLanguagesListService,
  createLanguageService,
  updateLanguageService,
  deleteLanguageService,
  getMerchantsListService,
} from "@/redux/services/merchants";
import ConfirmationModal from "@/components/common/ConfirmationModal";

export default function Languages() {
  const dispatch = useDispatch();
  const { languagesList, languageLoading, merchantsList } = useSelector((state) => state.merchants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    merchantCode: "",
  });

  const schema = yup.object({
    name: yup.string().required("اسم اللغة مطلوب"),
    merchantCode: yup.string().required("رمز المتجر مطلوب"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(getLanguagesListService());
    dispatch(getMerchantsListService());
  }, [dispatch]);

  const handleOpenModal = (language = null) => {
    setSelectedLanguage(language);
    if (language) {
      setFormData({
        name: language.name,
        merchantCode: language.id,
      });
    } else {
      setFormData({
        name: "",
        merchantCode: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLanguage(null);
    setFormData({ name: "", merchantCode: "" });
  };

  const handleOpenDeleteModal = (language) => {
    setSelectedLanguage(language);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedLanguage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedLanguage) {
        await dispatch(updateLanguageService({ id: selectedLanguage.id, data: formData })).unwrap();
        toast.success("تم تحديث اللغة بنجاح");
      } else {
        await dispatch(createLanguageService(formData)).unwrap();
        toast.success("تم إضافة اللغة بنجاح");
      }
      handleCloseModal();
      dispatch(getLanguagesListService());
    } catch (error) {
      toast.error(error?.message || "حدث خطأ أثناء العملية");
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteLanguageService(selectedLanguage.id)).unwrap();
      toast.success("تم حذف اللغة بنجاح");
      handleCloseDeleteModal();
      dispatch(getLanguagesListService());
    } catch (error) {
      toast.error(error?.message || "حدث خطأ أثناء الحذف");
    }
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <form className="navbar-search" onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder="بحث"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn btn-primary-600 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
        >
          <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" />
          إضافة لغة جديدة
        </button>
      </div>

      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col text-start">الرقم</th>
                <th scope="col text-start">اسم اللغة</th>
                <th scope="col text-start">رمز المتجر</th>
                <th scope="col" className="text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {languageLoading ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    جاري التحميل...
                  </td>
                </tr>
              ) : languagesList?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    لا توجد لغات
                  </td>
                </tr>
              ) : (
                languagesList?.map((language, index) => (
                  <tr key={language.id}>
                    <td>{index + 1}</td>
                    <td>{language.name}</td>
                    <td>{language.merchantId}</td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <button
                          type="button"
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                          onClick={() => handleOpenModal(language)}
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </button>
                        <button
                          type="button"
                          className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                          onClick={() => handleOpenDeleteModal(language)}
                        >
                          <Icon icon="fluent:delete-24-regular" className="menu-icon" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
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
          onClick={handleCloseModal}
        >
          <div 
            className="modal-content" 
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              width: "500px",
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
                {selectedLanguage ? "تعديل اللغة" : "إضافة لغة جديدة"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={onSubmit}>
              <div className="modal-body" style={{ padding: "1rem" }}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold text-primary-light text-sm mb-8">اسم اللغة</label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="أدخل اسم اللغة"
                  />
                </div>
              
                <div className="mb-3">
                  <label htmlFor="merchantCode" className="form-label fw-semibold text-primary-light text-sm mb-8">المتجر</label>
                  <select
                    className="form-select radius-8"
                    id="merchantCode"
                    name="merchantCode"
                    value={formData.merchantCode}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">اختر المتجر</option>
                    {merchantsList?.map((merchant) => (
                      <option key={merchant.id} value={ selectedLanguage ? merchant.id : merchant.code}>
                        {merchant.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer" style={{ borderTop: "1px solid #dee2e6", padding: "1rem", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                <button
                  type="button"
                  className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
                  onClick={handleCloseModal}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="btn btn-primary-600 border border-primary-600 text-md px-24 py-12 radius-8"
                  disabled={languageLoading}
                >
                  {languageLoading ? (
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
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
        title="تأكيد الحذف"
        message="هل أنت متأكد من حذف هذه اللغة؟"
      />
    </div>
  );
} 