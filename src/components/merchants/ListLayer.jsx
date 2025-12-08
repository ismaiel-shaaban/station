"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import Pagination from "../common/Pagination";
import { toast } from "react-toastify";
import ConfirmationModal from "../common/ConfirmationModal";
import { getMerchantsListService, changeMerchantStatusService, deleteMerchantService } from "@/redux/services/merchants";

import { useTranslation } from "@/utils/useTranslation";

export default function MerchantListLayer() {
  const [updatingId, setUpdatingId] = useState(null);
  const { $t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { merchantsList, metaData, isLoading, isLoadingDelete, isLoadingStatusChange } = useSelector((state) => state.merchants);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedMerchantId, setSelectedMerchantId] = useState(null);
  const [selectedMerchantStatus, setSelectedMerchantStatus] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const itemsPerPage = 10;

  const statusOptions = [
    { value: "", label: "جميع الحالات" },
    { value: "PENDING", label: "في الانتظار" },
    { value: "APPROVED", label: "مفعل" },
    { value: "REJECTED", label: "مرفوض" },
    { value: "BLOCKED", label: "محظور" }
  ];

  useEffect(() => {
    dispatch(
      getMerchantsListService({
        page: currentPage - 1,
        limit: itemsPerPage,
        search: searchTerm || undefined,
        status: statusFilter || undefined,
      })
    );
  }, [dispatch, currentPage, searchTerm, statusFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (merchantId) => {
    setSelectedMerchantId(merchantId);
    setIsDeleteConfirmModalOpen(true);
  };

  const handleDeleteMerchant = async () => {
    try {
      await dispatch(deleteMerchantService(selectedMerchantId)).unwrap();
      
      toast.success("تم حذف المتجر بنجاح");
      setIsDeleteConfirmModalOpen(false);
      setSelectedMerchantId(null);
      
      // Check if we need to go to previous page (if this was the last item on the page)
      if (merchantsList?.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        // Refresh current page
        dispatch(
          getMerchantsListService({
            page: currentPage - 1,
            limit: itemsPerPage,
            search: searchTerm || undefined,
            status: statusFilter || undefined,
          })
        );
      }
    } catch (error) {
      toast.error("فشل في حذف المتجر");
    }
  };

  const handleStatusChangeClick = (merchantId, currentStatus) => {
    setSelectedMerchantId(merchantId);
    setSelectedMerchantStatus(currentStatus);
    setNewStatus("");
    setIsStatusModalOpen(true);
  };

  const handleStatusChange = async () => {
    if (!newStatus) {
      toast.error("يرجى اختيار حالة جديدة");
      return;
    }

    setUpdatingId(selectedMerchantId);
    try {
      await dispatch(changeMerchantStatusService({ 
        userId: selectedMerchantId, 
        status: newStatus 
      })).unwrap();
      
      dispatch(getMerchantsListService({
        page: currentPage - 1,
        limit: itemsPerPage,
        search: searchTerm || undefined,
        status: statusFilter || undefined,
      }));
      
      toast.success("تم تغيير حالة المتجر بنجاح");
      setIsStatusModalOpen(false);
      setSelectedMerchantId(null);
      setSelectedMerchantStatus("");
      setNewStatus("");
    } catch (error) {
      toast.error("فشل في تغيير حالة المتجر");
    }
    setUpdatingId(null);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setIsStatusModalOpen(false);
    setIsDeleteConfirmModalOpen(false);
    setSelectedMerchantId(null);
    setSelectedMerchantStatus("");
    setNewStatus("");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED':
        return { icon: 'mdi:check-circle', color: 'text-success-600', bg: 'bg-success-focus' };
      case 'PENDING':
        return { icon: 'mdi:clock-outline', color: 'text-warning-600', bg: 'bg-warning-focus' };
      case 'REJECTED':
        return { icon: 'mdi:close-circle', color: 'text-danger-600', bg: 'bg-danger-focus' };
      case 'BLOCKED':
        return { icon: 'mdi:block-helper', color: 'text-secondary-600', bg: 'bg-secondary-focus' };
      default:
        return { icon: 'mdi:help-circle', color: 'text-muted', bg: 'bg-muted' };
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'مفعل';
      case 'PENDING':
        return 'في الانتظار';
      case 'REJECTED':
        return 'مرفوض';
      case 'BLOCKED':
        return 'محظور';
      default:
        return 'غير محدد';
    }
  };

  const totalPages = metaData?.totalPages || 1;

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <form className="navbar-search" onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder={$t("Search")}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
          <select
            className="form-select h-40-px"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <Link
          href="/dashboard/merchants/add"
          className="btn btn-primary-600 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
        >
          <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" />
          {$t("اضافة متجر")}
        </Link>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col text-start">{$t("ID")}</th>
                <th scope="col text-start">{$t("الصورة")}</th>
                <th scope="col text-start">{$t("اسم المتجر")}</th>
                <th scope="col text-start">{$t("اسم المستخدم")}</th>
                <th scope="col text-start">{$t("رقم الهاتف")}</th>
                <th scope="col text-start">{$t("نوع المتجر")}</th>
                <th scope="col text-start">{$t("الحالة")}</th>
                <th scope="col" className="text-center">{$t("العمليات")}</th>
              </tr>
            </thead>
            <tbody>
              {merchantsList?.length > 0 ? (
                merchantsList.map((merchant, idx) => {
                  const statusInfo = getStatusIcon(merchant.status);
                  return (
                    <tr key={merchant.id}>
                      <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                      <td>
                        {merchant.logo && (
                          <img
                            src={`https://us-east-1.linodeobjects.com/fantaza/${merchant.logo}`}
                            alt={merchant.name}
                            className="w-40-px h-40-px rounded-circle object-fit-cover"
                          />
                        )}
                      </td>
                      <td>{merchant.name}</td>
                      <td>{merchant.username}</td>
                      <td>{merchant.phone}</td>
                      <td>{merchant.merchantTypeName || '-'}</td>
                      <td>
                        <span className={`badge ${statusInfo.bg} ${statusInfo.color} d-flex align-items-center gap-1`}>
                          <Icon icon={statusInfo.icon} className="icon" />
                          {getStatusLabel(merchant.status)}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="d-flex align-items-center gap-10 justify-content-center">
                          <button
                            type="button"
                            className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium d-flex justify-content-center align-items-center p-8 rounded-2"
                            onClick={() => router.push(`/dashboard/merchants/${merchant.id}/view`)}
                          >
                            <Icon icon="majesticons:eye-line" className="icon text-xl mt-2 me-2" />
                          </button>

                          <button
                            type="button"
                            className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                            onClick={() => router.push(`/dashboard/merchants/${merchant.id}/edit`)}
                          >
                            <Icon icon="lucide:edit" className="menu-icon" />
                          </button>

                          <button
                            type="button"
                            className="bg-warning-focus text-warning-600 bg-hover-warning-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                            onClick={() => handleStatusChangeClick(merchant.id, merchant.status)}
                            disabled={isLoadingStatusChange && updatingId === merchant.id}
                            title="تغيير الحالة"
                          >
                            {isLoadingStatusChange && updatingId === merchant.id ? (
                              <span className="spinner-border spinner-border-sm" />
                            ) : (
                              <Icon icon="mdi:account-cog" className="menu-icon" />
                            )}
                          </button>

                          <button
                            type="button"
                            className="bg-danger-focus text-danger-600 bg-hover-danger-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                            onClick={() => handleDeleteClick(merchant.id)}
                            disabled={isLoadingDelete}
                            title="حذف المتجر"
                          >
                            {isLoadingDelete && selectedMerchantId === merchant.id ? (
                              <span className="spinner-border spinner-border-sm" />
                            ) : (
                              <Icon icon="lucide:trash-2" className="menu-icon" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    {isLoading ? $t("Loading") : $t("NoMerchantsFound")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
          <span>
            {$t("Showing")} {(currentPage - 1) * itemsPerPage + 1}-
            {merchantsList?.length || 0} {"من"} {metaData?.totalElements || 0} {$t("متجر")}
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Status Change Modal */}
      <ConfirmationModal
        isOpen={isStatusModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleStatusChange}
        title="تغيير حالة المتجر"
        message={
          <div>
            <p>الحالة الحالية: <strong>{getStatusLabel(selectedMerchantStatus)}</strong></p>
            <div className="mt-3">
              <label className="form-label">اختر الحالة الجديدة:</label>
              <select
                className="form-select"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="">اختر الحالة</option>
                {statusOptions.slice(1).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        }
        confirmText="تغيير الحالة"
        cancelText="إلغاء"
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteConfirmModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteMerchant}
        title="حذف المتجر"
        message={
          <div>
            <p>هل أنت متأكد من حذف هذا المتجر؟</p>
            <p>هذا الإجراء لا يمكن التراجع عنه.</p>
            <div className="alert alert-danger mt-3">
              <p><strong>تحذير:</strong> سيتم حذف جميع بيانات المتجر بشكل نهائي.</p>
            </div>
          </div>
        }
        confirmText="حذف"
        cancelText="إلغاء"
      />
    </div>
  );
}
