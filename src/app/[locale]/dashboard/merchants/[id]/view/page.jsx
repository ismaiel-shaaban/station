// School View Page (scaffold)
import Breadcrumb from '@/components/common/Breadcrumb';
import ViewSchool from '@/components/merchants/ViewLayer';
import MasterLayout from '@/masterLayout/MasterLayout';
export default function ViewSchoolPage({ params }) {
  return (
    <MasterLayout>
      <Breadcrumb title="تفاصيل المتجر" />
      <ViewSchool id={params.id} />
    </MasterLayout>
  );
}
