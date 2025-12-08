"use client"
import Breadcrumb from '@/components/common/Breadcrumb';
import SchoolListLayer from '@/components/merchants/ListLayer';
import MasterLayout from '@/masterLayout/MasterLayout';

export default function SchoolListPage() {
  return (
    <MasterLayout>
      <Breadcrumb title="المتاجر" />
      <SchoolListLayer />
    </MasterLayout>
  );
}
