'use client'
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { getUserStatisticsService } from '@/redux/services/generalService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const UnitCountOne = () => {
    const { statisticsUsers } = useSelector((state) => state.general);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const fetchData = async () => {
        try {
            await dispatch(getUserStatisticsService());
        } catch (error) {
            console.error('Failed to fetch user statistics:', error);
        }
    };

    return (
        <>
            <div className="row row-cols-xxxl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4 mt-3">
                <div className="col">
                    <div className="card shadow-none border bg-gradient-start-1 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">إجمالي المتاجر</p>
                                    <h6 className="mb-0">{statisticsUsers?.totalMerchants ?? 0}</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:store" className="text-white text-2xl mb-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-none border bg-gradient-start-1 h-100">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div>
                                    <p className="fw-medium text-primary-light mb-1">المنتجات المتاحة</p>
                                    <h6 className="mb-0">{statisticsUsers?.availableProducts ?? 0}</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:package-variant" className="text-white text-2xl mb-0" />
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
                                    <p className="fw-medium text-primary-light mb-1">إجمالي الطلبات</p>
                                    <h6 className="mb-0">{statisticsUsers?.totalOrders ?? 0}</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:cart" className="text-white text-2xl mb-0" />
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
                                    <p className="fw-medium text-primary-light mb-1">الطلبات المكتملة</p>
                                    <h6 className="mb-0">{statisticsUsers?.completedOrders ?? 0}</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-success rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:check-circle" className="text-white text-2xl mb-0" />
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
                                    <p className="fw-medium text-primary-light mb-1">الطلبات الملغاة</p>
                                    <h6 className="mb-0">{statisticsUsers?.cancelledOrders ?? 0}</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-danger rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:cancel" className="text-white text-2xl mb-0" />
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
                                    <p className="fw-medium text-primary-light mb-1">الطلبات المعلقة</p>
                                    <h6 className="mb-0">{statisticsUsers?.pendingOrders ?? 0}</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-warning rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:clock-outline" className="text-white text-2xl mb-0" />
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
                                    <p className="fw-medium text-primary-light mb-1">سجل الزيارات</p>
                                    <h6 className="mb-0">{statisticsUsers?.visitLog ?? 0}</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-primary rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:eye" className="text-white text-2xl mb-0" />
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
                                    <p className="fw-medium text-primary-light mb-1">الربح الإجمالي</p>
                                    <h6 className="mb-0">{statisticsUsers?.totalAdminProfit ?? 0}</h6>
                                </div>
                                <div className="w-50-px h-50-px bg-primary rounded-circle d-flex justify-content-center align-items-center">
                                    <Icon icon="mdi:dollar-sign" className="text-white text-2xl mb-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UnitCountOne;