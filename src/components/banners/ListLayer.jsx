"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  getBannersService,
  deleteBannerService,
  addBannerService,
  updateBannerService,
} from "@/redux/services/banner";
import { useRouter } from "next/navigation";
import { uploadFileService } from "@/redux/services/generalService";
import React, { useEffect, useState } from "react";
import { toggleBannerStatusService } from "@/redux/services/banner";
import { Icon } from "@iconify/react";
import ConfirmationModal from "../common/ConfirmationModal";
import Pagination from "../common/Pagination";
import { toast } from "react-toastify";

export default function Banners() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    data: banners,
    meta,
    loading,
  } = useSelector((state) => state.banners);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBannerId, setSelectedBannerId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const itemsPerPage = 10;
  const [updatingId, setUpdatingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    link: "",
    photo: "",
    status: "ACTIVE"
  });

  useEffect(() => {
    dispatch(
      getBannersService({
        page: currentPage - 1,
        limit: itemsPerPage,
        search: searchTerm || undefined,
      })
    );
  }, [dispatch, currentPage, searchTerm]);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleAdd = () => setIsAddModalOpen(true);
  const handleEdit = (banner) => {
    setFormData({
      name: banner.name,
      description: banner.description,
      link: banner.link,
      photo: banner.image,
      status: banner.status
    });
    setPreviewUrl(banner.photo ? `https://us-east-1.linodeobjects.com/fantaza/${banner.photo}` : "");
    setSelectedBannerId(banner.id);
    setIsEditModalOpen(true);
  };
  const handleView = (id) => router.push(`/dashboard/banners/view/${id}`);
  const handleDeleteClick = (id) => {
    setSelectedBannerId(id);
    setIsDeleteModalOpen(true);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      
      const formData = new FormData();
      formData.append("file", file);
      
      try {
        const response = await dispatch(uploadFileService({ formData, bucketName: "fantaza" })).unwrap();
        setFormData(prev => ({ ...prev, photo: response.name }));
      } catch (error) {
        toast.error("فشل في رفع الصورة");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditModalOpen) {
        await dispatch(updateBannerService({ id: selectedBannerId, data: formData })).unwrap();
        toast.success("تم تحديث البنر بنجاح");
      } else {
        await dispatch(addBannerService(formData)).unwrap();
        toast.success("تم إضافة البنر بنجاح");
      }
      handleCloseModals();
      dispatch(
        getBannersService({
          page: currentPage - 1,
          limit: itemsPerPage,
          search: searchTerm || undefined,
        })
      );
    } catch (error) {
      toast.error("حدث خطأ أثناء حفظ البنر");
    }
  };

  const handleCloseModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedBannerId(null);
    setSelectedFile(null);
    setPreviewUrl("");
    setFormData({
      name: "",
      description: "",
      link: "",
      photo: "",
      status: "ACTIVE"
    });
  };

  const handleConfirmDelete = async () => {
    await dispatch(deleteBannerService(selectedBannerId));
    setIsDeleteModalOpen(false);
    setSelectedBannerId(null);
    dispatch(
      getBannersService({
        page: currentPage - 1,
        limit: itemsPerPage,
        search: searchTerm || undefined,
      })
    );
  };

  const totalPages = meta?.totalPages || 1;

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <form className="navbar-search" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder="بحث"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
        </div>
        <button
          className="btn btn-primary-600 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
          onClick={handleAdd}
        >
          <Icon
            icon="ic:baseline-plus"
            className="icon text-xl line-height-1"
          />
          إضافة بنر جديد
        </button>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">الاسم</th>
                <th scope="col">الوصف</th>
                <th scope="col">الرابط</th>
                <th scope="col">الصورة</th>
                <th scope="col" className="text-center">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    <span className="spinner-border spinner-border-sm" /> جاري
                    التحميل...
                  </td>
                </tr>
              ) : banners && banners.length > 0 ? (
                banners.map((banner, idx) => (
                  <tr key={banner.id}>
                    <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                    <td>{banner.name}</td>
                    <td>{banner.description}</td>
                    <td>{banner.link}</td>
                    <td>
                      {banner.photo ? (
                        <img
                          src={
                            banner.photo.startsWith("http")
                              ? banner.photo
                              : `https://us-east-1.linodeobjects.com/fantaza/${banner.photo}`
                          }
                          alt="banner"
                          width={80}
                          className="rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <button
                          className={`btn btn-sm ${
                            banner.status === "ACTIVE"
                              ? "btn-success"
                              : "btn-secondary"
                          }`}
                          disabled={updatingId === banner.id}
                          onClick={async () => {
                            setUpdatingId(banner.id);
                            await dispatch(
                              toggleBannerStatusService({
                                bannerId: banner.id,
                                status:
                                  banner.status === "ACTIVE"
                                    ? "INACTIVE"
                                    : "ACTIVE",
                              })
                            );
                            setUpdatingId(null);
                          }}
                        >
                          {updatingId === banner.id ? (
                            <span className="spinner-border spinner-border-sm" />
                          ) : banner.status === "ACTIVE" ? (
                            "نشط"
                          ) : (
                            "غير نشط"
                          )}
                        </button>
                        <button
                          type="button"
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                          onClick={() => handleEdit(banner)}
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </button>
                        <button
                          type="button"
                          className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                          onClick={() => handleDeleteClick(banner.id)}
                        >
                          <Icon
                            icon="fluent:delete-24-regular"
                            className="menu-icon"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    لا توجد بيانات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
          <span>
            عرض {(currentPage - 1) * itemsPerPage + 1}-{banners?.length || 0} من{" "}
            {meta?.totalElements} بانر
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
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
          onClick={handleCloseModals}
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
                {isEditModalOpen ? "تعديل البنر" : "إضافة بنر جديد"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModals}
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
                    placeholder="أدخل اسم البنر"
                  />
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
                    placeholder="أدخل وصف البنر"
                    rows="3"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="link" className="form-label fw-semibold text-primary-light text-sm mb-8">الرابط</label>
                  <input
                    type="url"
                    className="form-control radius-8"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    required
                    placeholder="أدخل رابط البنر"
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
                  <label htmlFor="status" className="form-label fw-semibold text-primary-light text-sm mb-8">الحالة</label>
                  <select
                    className="form-select radius-8"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="ACTIVE">نشط</option>
                    <option value="INACTIVE">غير نشط</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer" style={{ borderTop: "1px solid #dee2e6", padding: "1rem", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                <button
                  type="button"
                  className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
                  onClick={handleCloseModals}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="btn btn-primary-600 border border-primary-600 text-md px-24 py-12 radius-8"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="d-flex align-items-center gap-2">
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      جاري الحفظ...
                    </span>
                  ) : (
                    isEditModalOpen ? "تحديث" : "إضافة"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleConfirmDelete}
        title="تأكيد الحذف"
        message="هل أنت متأكد من حذف هذا البنر؟"
      />
    </div>
  );
}
