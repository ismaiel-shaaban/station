"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import { useTranslation } from "@/utils/useTranslation";
import ConfirmationModal from "../common/ConfirmationModal";
import {
  getMerchantTypesService,
  createMerchantTypeService,
  updateMerchantTypeService,
  deleteMerchantTypeService,
} from "@/redux/services/merchants";
import { uploadFileService } from "@/redux/services/generalService";

export default function MerchantTypes() {
  const { $t } = useTranslation();
  const dispatch = useDispatch();
  const { merchantTypesList, isLoading, isLoadingDelete } = useSelector((state) => state.merchants);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    dispatch(getMerchantTypesService());
  }, [dispatch]);

  const handleAddClick = () => {
    setFormData({ name: "", photo: "", description: "" });
    setSelectedFile(null);
    setPreviewUrl("");
    setIsAddModalOpen(true);
  };

  const handleEditClick = (type) => {
    setSelectedType(type);
    setFormData({
      name: type.name,
      photo: type.photo,
      description: type.description,
    });
    setPreviewUrl(type.photo);
    setSelectedFile(null);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (type) => {
    setSelectedType(type);
    setIsDeleteModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));

      try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await dispatch(uploadFileService({formData , bucketName: "merchant-types"})).unwrap();
        setFormData(prev => ({
          ...prev,
          photo: response.name
        }));
      } catch (error) {
        toast.error(error?.data?.message || "فشل رفع الصورة");
        setSelectedFile(null);
        setPreviewUrl("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditModalOpen) {
        await dispatch(updateMerchantTypeService({ id: selectedType.id, data: formData })).unwrap();
        toast.success("تم تحديث نوع التاجر بنجاح");
        setIsEditModalOpen(false);
      } else {
        await dispatch(createMerchantTypeService(formData)).unwrap();
        toast.success("تم إضافة نوع التاجر بنجاح");
        setIsAddModalOpen(false);
      }
      dispatch(getMerchantTypesService());
    } catch (error) {
      toast.error(error?.data?.message || "فشلت العملية");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteMerchantTypeService(selectedType.id)).unwrap();
      toast.success("تم حذف نوع التاجر بنجاح");
      setIsDeleteModalOpen(false);
      dispatch(getMerchantTypesService());
    } catch (error) {
      toast.error(error?.data?.message || "فشل الحذف");
    }
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedType(null);
    setFormData({ name: "", photo: "", description: "" });
    setSelectedFile(null);
    setPreviewUrl("");
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          {/* <form className="navbar-search" onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder="بحث"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form> */}
        </div>
        <button
          onClick={handleAddClick}
          className="btn btn-primary-600 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
        >
          <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" />
          إضافة نوع تاجر جديد
        </button>
      </div>

      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col text-start">الرقم</th>
                <th scope="col text-start">الاسم</th>
                <th scope="col text-start">الصورة</th>
                <th scope="col text-start">الوصف</th>
                <th scope="col" className="text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {merchantTypesList?.length > 0 ? (
                merchantTypesList.map((type, idx) => (
                  <tr key={type.id}>
                    <td>{idx + 1}</td>
                    <td>{type.name}</td>
                    <td>
                      {type.photo && (
                        <img 
                          src={`https://us-east-1.linodeobjects.com/fantaza/${type.photo}`} 
                          alt={type.name} 
                          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                      )}
                    </td>
                    <td>{type.description}</td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <button
                          type="button"
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                          onClick={() => handleEditClick(type)}
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </button>
                        <button
                          type="button"
                          className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                          onClick={() => handleDeleteClick(type)}
                          disabled={isLoadingDelete}
                        >
                          <Icon icon="fluent:delete-24-regular" className="menu-icon" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    {isLoading ? "جاري التحميل..." : "لا توجد أنواع تجار"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
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
                {isEditModalOpen ? "تعديل نوع التاجر" : "إضافة نوع تاجر جديد"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ padding: "1rem" }}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold text-primary-light text-sm mb-8">الاسم</label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="أدخل اسم نوع التاجر"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="photo" className="form-label fw-semibold text-primary-light text-sm mb-8">الصورة</label>
                  <input
                    type="file"
                    className="form-control radius-8"
                    id="photo"
                    name="photo"
                    onChange={handleFileChange}
                    accept="image/*"
                    required={!isEditModalOpen}
                  />
                  {previewUrl && (
                    <div className="mt-2">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        style={{ 
                          width: '100px', 
                          height: '100px', 
                          objectFit: 'cover', 
                          borderRadius: '4px',
                          marginTop: '8px'
                        }} 
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label fw-semibold text-primary-light text-sm mb-8">الوصف</label>
                  <textarea
                    className="form-control radius-8"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="أدخل وصف نوع التاجر"
                    rows="3"
                  />
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
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="تأكيد الحذف"
        message="هل أنت متأكد من حذف هذا النوع من التجار؟"
      />
    </div>
  );
} 