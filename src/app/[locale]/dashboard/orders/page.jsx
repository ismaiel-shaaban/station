"use client";
import React from 'react';
import Orders from '@/components/orders/Orders';
import Breadcrumb from "@/components/common/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";

const OrdersPage = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Orders' />

                {/* Orders Component */}
                <Orders />
            </MasterLayout>
        </>
    );
};

export default OrdersPage; 