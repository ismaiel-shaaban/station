"use client";
import { useDispatch, useSelector } from "react-redux";
import { getUsersService, updateUserStatusService } from "@/redux/services/user";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import ConfirmationModal from "../common/ConfirmationModal";
import Pagination from "../common/Pagination";
import { toast } from "react-toastify";

export default function Users() {
  const dispatch = useDispatch();
  const {
    data: users,
    meta,
    loading,
  } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const itemsPerPage = 10;
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    dispatch(
      getUsersService({
        page: currentPage - 1,
        limit: itemsPerPage,
        search: searchTerm || undefined,
        role: "CUSTOMER"
      })
    );
  }, [dispatch, currentPage, searchTerm]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleStatusChange = (userId, currentStatus) => {
    setSelectedUserId(userId);
    setSelectedStatus(currentStatus === "APPROVED" ? "BLOCKED" : "APPROVED");
    setIsStatusModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsStatusModalOpen(false);
    setSelectedUserId(null);
    setSelectedStatus(null);
  };

  const handleConfirmStatusChange = async () => {
    try {
      setUpdatingId(selectedUserId);
      await dispatch(updateUserStatusService({ 
        userId: selectedUserId, 
        status: selectedStatus 
      })).unwrap();
      toast.success("تم تحديث حالة المستخدم بنجاح");
      handleCloseModals();
      dispatch(
        getUsersService({
          page: currentPage - 1,
          limit: itemsPerPage,
          search: searchTerm || undefined,
          role: "CUSTOMER"
        })
      );
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث حالة المستخدم");
    } finally {
      setUpdatingId(null);
    }
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
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">اسم المستخدم</th>
                <th scope="col">الاسم الأول</th>
                <th scope="col">الاسم الأخير</th>
                <th scope="col">البريد الإلكتروني</th>
                <th scope="col">رقم الهاتف</th>
                <th scope="col">الحالة</th>
                <th scope="col" className="text-center">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center">
                    <span className="spinner-border spinner-border-sm" /> جاري
                    التحميل...
                  </td>
                </tr>
              ) : users && users.length > 0 ? (
                users.map((user, idx) => (
                  <tr key={user.id}>
                    <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.emile}</td>
                    <td>{user.phone}</td>
                    <td>
                      <span className={`badge ${user.active ? 'bg-success' : 'bg-danger'}`}>
                        {user.active ? 'نشط' : 'محظور'}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <button
                          className={`btn btn-sm ${
                            user.active ? "btn-danger" : "btn-success"
                          }`}
                          disabled={updatingId === user.id}
                          onClick={() => handleStatusChange(user.id, user.active ? "APPROVED" : "BLOCKED")}
                        >
                          {updatingId === user.id ? (
                            <span className="spinner-border spinner-border-sm" />
                          ) : user.active ? (
                            "حظر"
                          ) : (
                            "تفعيل"
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    لا توجد بيانات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
          <span>
            عرض {(currentPage - 1) * itemsPerPage + 1}-{users?.length || 0} من{" "}
            {meta?.totalElements || 0} مستخدم
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <ConfirmationModal
        isOpen={isStatusModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleConfirmStatusChange}
        title="تأكيد تغيير الحالة"
        message={`هل أنت متأكد من ${selectedStatus === "APPROVED" ? "تفعيل" : "حظر"} هذا المستخدم؟`}
      />
    </div>
  );
} 