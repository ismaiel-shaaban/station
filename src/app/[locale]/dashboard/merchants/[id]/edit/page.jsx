"use client"
import EditSchool from '@/components/merchants/Edit';
import MasterLayout from "@/masterLayout/MasterLayout";
import Breadcrumb from "@/components/common/Breadcrumb";

// export const metadata = {
//   title: "المحطة",
//   description: "",
// };

const Page = ({ params }) => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="تعديل المتجر" />
        <EditSchool schoolId={params.id} />
      </MasterLayout>
    </>
  );
};

export default Page;
