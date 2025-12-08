"use client"
import Breadcrumb from '@/components/common/Breadcrumb';
import MerchantTypes from '@/components/merchants/MerchantTypes';
import MasterLayout from '@/masterLayout/MasterLayout';

export default function SchoolListPage() {
  return (
    <MasterLayout>
      <Breadcrumb title="المتاجر" />
      <MerchantTypes />
    </MasterLayout>
  );
}
