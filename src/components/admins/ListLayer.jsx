"use client";
import useLocale from "@/hook/useLocale";
import { useTranslation } from "@/utils/useTranslation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useEffect, useReducer, useState } from "react";
import Pagination from "../common/Pagination";
import { useRouter } from "next/navigation";
import ConfirmationModal from "../common/ConfirmationModal"; // Import the reusable modal
import { useDispatch } from "react-redux";
import { deleteMemberService, getAdminsService } from "@/redux/services/admins";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UsersListLayer = () => {
  const currentLocale = useLocale();
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);
  const { $t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();
  const { adminsList ,metaManagerMember} = useSelector((state) => state.admins);
  console.log(adminsList);

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const dispatch = useDispatch()
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Kathryn Murphy",
      mobile: "+1234567890",
      country: "USA",
      address: "123 Main St, New York",
      email: "osgoodwy@gmail.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Annette Black",
      mobile: "+9876543210",
      country: "Canada",
      address: "456 Maple Rd, Toronto",
      email: "redaniel@gmail.com",
      status: "Inactive",
    },
    // Add more user data here...
  ]);
  useEffect(() => {
    dispatch(getAdminsService({page:currentPage -1  ,size:10 ,search:searchTerm}))
  }, [update ,currentPage ,searchTerm]);

  // Open the modal and set the user to delete
  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  // Confirm delete action
  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        const response = await dispatch(deleteMemberService(userToDelete)).unwrap();
        console.log(response);
        
        toast.success($t("DeleteSuccess"));
      } catch (error) {
        console.error("Error:", error);
        if (error.data) {
          toast.error(`Error: ${error.data.message || $t("SomethingWentWrong")}`);
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
      forceUpdate()
      setIsModalOpen(false);
      setUserToDelete(null);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };



  const totalPages = metaManagerMember?.totalPages


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">

  
        </div>
        <Link
          href="/dashboard/admins/add"
          className="btn  btn-primary-600 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
        >
          <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" />
          {$t("AddNewUser")}
        </Link>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col text-start">{$t("ID")}</th>
                <th scope="col text-start">{$t("Name")}</th>
                <th scope="col text-start">{$t("Mobile")}</th>
      
                <th scope="col" className="text-center">{$t("Action")}</th>
              </tr>
            </thead>
            <tbody>
              {adminsList?.map((user, index) => (
                <tr key={user.id}>
                  <td className="">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="">{user?.username}</td>
                  <td className="">{user?.phone}</td>
          
                  <td className="text-center">
                    <div className="d-flex align-items-center gap-10 justify-content-center">
                      {/* <button
                        onClick={() => router.push(`admins/${user.id}`)}
                        type="button"
                        className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                      >
                        <Icon
                          icon="majesticons:eye-line"
                          className="icon text-xl"
                        />
                      </button> */}
                      <button
                        onClick={() => router.push(`admins/${user.id}/edit`)}
                        type="button"
                        className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                      >
                        <Icon icon="lucide:edit" className="menu-icon" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user.id)}
                        type="button"
                        className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                      >
                        <Icon icon="fluent:delete-24-regular" className="menu-icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {adminsList?.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center">
                    {$t("NoUsersFound")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
          <span>
            {$t("Showing")} {(currentPage - 1) * itemsPerPage + 1}-
            {adminsList?.length} من{" "}
            {metaManagerMember?.count} {$t("Users")}
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Reusable Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title={$t("ConfirmDelete")}
        message={$t("AreYouSureYouWantToDeleteThisUser")}
      />
    </div>
  );
};

export default UsersListLayer;