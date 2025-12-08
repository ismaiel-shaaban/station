"use client";
import { useTranslation } from "@/utils/useTranslation";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { getMemberByIdService } from "@/redux/services/admins";
import { useSelector } from "react-redux";

const ViewProfileLayer = () => {
  const { $t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const { managerMemberData } = useSelector((state) => state.branchManagers);

  useEffect(() => {
    params.id && dispatch(getMemberByIdService(params.id));
  }, [dispatch, params]);

  const personalInfo = [
    { label: $t("FullName"), value: managerMemberData?.user?.name },
    { label: $t("Email"), value: managerMemberData?.user?.email },
    { label: $t("PhoneNumber"), value: managerMemberData?.user?.mobile },
    { 
      label: $t("Country"), 
      value: managerMemberData?.user?.country?.name_en || $t("NotAvailable")
    },
    { 
      label: $t("UserType"), 
      value: managerMemberData?.user?.user_type?.replace(/_/g, ' ') || ''
    },
    { 
      label: $t("HireDate"), 
      value: managerMemberData?.hire_date ? new Date(managerMemberData.hire_date).toLocaleDateString() : ''
    },
    { 
      label: $t("Address"), 
      value: managerMemberData?.user?.address || $t("NotAvailable")
    },
  ];

  return (
    <div className="row gy-4">
      <div className="">
        <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
          <div className="pb-24 ms-16 mb-24 me-16 ">
            <div className="mt-24">
              <h6 className="text-xl mb-16">{$t("PersonalInfo")}</h6>
              <ul>
                {personalInfo.map((info, index) => (
                  <li
                    key={index}
                    className="d-flex align-items-center gap-1 mb-12"
                  >
                    <span className="w-30 text-md fw-semibold text-primary-light">
                      {info.label}
                    </span>
                    <span className="w-70 text-secondary-light fw-medium">
                      : {info.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfileLayer;