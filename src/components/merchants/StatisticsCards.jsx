"use client";
import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { getSchoolStatistics } from "@/redux/services/merchants";

export default function StatisticsCards({ schoolId, startDate, endDate }) {
  const dispatch = useDispatch();
  const { statistics, statisticsLoading } = useSelector((state) => state.schools);
  console.log(statistics);
  useEffect(() => {
    if (schoolId) {
      dispatch(getSchoolStatistics({ id: schoolId, startDate, endDate }));
    }
    // eslint-disable-next-line
  }, [dispatch, schoolId, startDate, endDate]);

  return (
    <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
      <div className="col">
        <div className="card shadow-none border bg-gradient-start-1 h-100">
          <div className="card-body p-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-medium text-primary-light mb-1">عدد الطلاب</p>
                <h6 className="mb-0">{statisticsLoading ? "..." : statistics?.numberOfStudents ?? 0}</h6>
              </div>
              <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                <Icon icon="fluent:people-20-filled" className="text-white text-2xl mb-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card shadow-none border bg-gradient-start-3 h-100">
          <div className="card-body p-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-medium text-primary-light mb-1">عدد المدرسين</p>
                <h6 className="mb-0">{statisticsLoading ? "..." : statistics?.numberOfTeachers ?? 0}</h6>
              </div>
              <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                <Icon icon="gridicons:multiple-users" className="text-white text-2xl mb-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card shadow-none border bg-gradient-start-2 h-100">
          <div className="card-body p-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-medium text-primary-light mb-1">عدد المواد</p>
                <h6 className="mb-0">{statisticsLoading ? "..." : statistics?.numberOfSubjects ?? 0}</h6>
              </div>
              <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                <Icon icon="fa-solid:award" className="text-white text-2xl mb-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card shadow-none border bg-gradient-start-4 h-100">
          <div className="card-body p-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-medium text-primary-light mb-1">عدد المراحل الدراسية</p>
                <h6 className="mb-0">{statisticsLoading ? "..." : statistics?.numberOfSchoolStages ?? 0}</h6>
              </div>
              <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                <Icon icon="fa6-solid:layer-group" className="text-white text-2xl mb-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card shadow-none border bg-gradient-start-5 h-100">
          <div className="card-body p-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-medium text-primary-light mb-1">عدد الجداول</p>
                <h6 className="mb-0">{statisticsLoading ? "..." : statistics?.numberOfSchedules ?? 0}</h6>
              </div>
              <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
                <Icon icon="mdi:table-large" className="text-white text-2xl mb-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
