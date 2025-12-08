"use client";
import useLocale from "@/hook/useLocale";
import { useTranslation } from "@/utils/useTranslation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import ConfirmationModal from "../common/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getNotificationsService,
  sendNotificationService,
  deleteNotificationService,
} from "@/redux/services/notification";
import { uploadFileService } from "@/redux/services/generalService";

const ListLayer = () => {
  const currentLocale = useLocale();
  const { $t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { data: notificationsItemsList, meta: metaItem } = useSelector((state) => state.notifications);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);  
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    topic: "",
    image: "",
  });

  useEffect(() => {
    dispatch(
      getNotificationsService({
        page: currentPage - 1,
        limit: itemsPerPage,
        search: searchTerm || undefined,
      })
    );
  }, [dispatch, currentPage, searchTerm]);

  const handleDeleteClick = (itemId) => {
    setItemToDelete(itemId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        await dispatch(deleteNotificationService(itemToDelete)).unwrap();
        toast.success($t("تم الحذف بنجاح"));
        dispatch(
          getNotificationsService({
            page: currentPage - 1,
            limit: itemsPerPage,
            search: searchTerm || undefined,
          })
        );
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.data?.message || $t("حدث خطأ ما"));
      }
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const totalPages = metaItem?.totalPages;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAdd = () => setIsAddModalOpen(true);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      
      const formData = new FormData();
      formData.append("file", file);
      
      try {
        const response = await dispatch(uploadFileService({ formData, bucketName: "fantaza" })).unwrap();
        setFormData(prev => ({ ...prev, image: response.name }));
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
    setLoading(true);
    e.preventDefault();
    try {
      await dispatch(sendNotificationService(formData)).unwrap();
      toast.success("تم إرسال الإشعار بنجاح");
      handleCloseModals();
      dispatch(
        getNotificationsService({
          page: currentPage - 1,
          limit: itemsPerPage,
          search: searchTerm || undefined,
        })
      );
    } catch (error) {
      toast.error("حدث خطأ أثناء إرسال الإشعار");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModals = () => {
    setIsAddModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl("");
    setFormData({
      title: "",
      body: "",
      topic: "",
      image: "",
    });
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <form className="navbar-search" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder={$t("بحث")}
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
          {$t("إرسال إشعار جديد")}
        </button>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">{$t("المعرف")}</th>
                <th scope="col">{$t("الصورة")}</th>
                <th scope="col">{$t("العنوان")}</th>
                <th scope="col">{$t("الموضوع")}</th>
                <th scope="col" style={{ maxWidth: '300px' }}>{$t("المحتوي")}</th>
                <th scope="col">{$t("التاريخ")}</th>
                <th scope="col">{$t("الإجراءات")}</th>
              </tr>
            </thead>
            <tbody>
              {notificationsItemsList?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={ item.image ? `https://us-east-1.linodeobjects.com/fantaza/${item.image}` : ""} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.topic}</td>
                  <td style={{ maxWidth: '300px' }}>{item.body}</td>
                  <td>{item.createdDate}</td>
                  <td className="text-center">
                    <div className="d-flex align-items-center gap-10 justify-content-center">
                      <button
                        onClick={() => handleDeleteClick(item.id)}
                        type="button"
                        className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                      >
                        <Icon icon="fluent:delete-24-regular" className="menu-icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {notificationsItemsList?.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    {$t("لم يتم العثور على عناصر")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
          <span>
            {$t("عرض")} {(currentPage - 1) * itemsPerPage + 1}-
            {notificationsItemsList?.length} من {metaItem?.totalElements} {$t("عناصر")}
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
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
              <h5 className="modal-title">{$t("إرسال إشعار جديد")}</h5>
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
                  <label htmlFor="title" className="form-label fw-semibold text-primary-light text-sm mb-8">{$t("العنوان")}</label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder={$t("أدخل عنوان الإشعار")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="body" className="form-label fw-semibold text-primary-light text-sm mb-8">{$t("المحتوى")}</label>
                  <textarea
                    className="form-control radius-8"
                    id="body"
                    name="body"
                    value={formData.body}
                    onChange={handleInputChange}
                    required
                    placeholder={$t("أدخل محتوى الإشعار")}
                    rows="3"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="topic" className="form-label fw-semibold text-primary-light text-sm mb-8">{$t("الموضوع")}</label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    required
                    placeholder={$t("أدخل موضوع الإشعار")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label fw-semibold text-primary-light text-sm mb-8">{$t("الصورة")}</label>
                  <input
                    type="file"
                    className="form-control radius-8"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
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
              </div>
              <div className="modal-footer" style={{ borderTop: "1px solid #dee2e6", padding: "1rem", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                <button
                  type="button"
                  className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
                  onClick={handleCloseModals}
                >
                  {$t("إلغاء")}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary-600 border border-primary-600 text-md px-24 py-12 radius-8"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="d-flex align-items-center gap-2">
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      {$t("جاري الإرسال...")}
                    </span>
                  ) : (
                    "إرسال"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title={$t("تأكيد الحذف")}
        message={$t("هل أنت متأكد من حذف هذا الإشعار؟")}
      />
    </div>
  );
};

export default ListLayer; 