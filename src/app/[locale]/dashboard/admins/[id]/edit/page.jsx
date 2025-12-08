import EditUserLayer from "@/components/admins/Edit";
import Breadcrumb from "@/components/common/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";

export const metadata = {
  title: "المحطة",
  description:
    "",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='EditUser' />

        {/* AddUserLayer */}
        <EditUserLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
