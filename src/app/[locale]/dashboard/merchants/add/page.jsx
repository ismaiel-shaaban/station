"use client"
import AddSchool from '@/components/merchants/Add';
import MasterLayout from "@/masterLayout/MasterLayout";
import Breadcrumb from "@/components/common/Breadcrumb";

// export const metadata = {
//   title: "المحطة",
//   description: "",
// };

const Page = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="اضافة متجر" />
        <AddSchool />
      </MasterLayout>
    </>
  );
};

export default Page;
