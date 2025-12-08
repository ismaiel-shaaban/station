import Breadcrumb from "@/components/common/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import EditSchool from "@/components/merchants/Edit";

export default function EditSchoolPage({ params }) {
  return (
    <MasterLayout>
      <Breadcrumb title="تعديل بيانات المدرسة" />
      <EditSchool schoolId={params.id} />
    </MasterLayout>
  );
}
