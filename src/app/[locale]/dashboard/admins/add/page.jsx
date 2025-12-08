import AddUserLayer from "@/components/admins/Add";
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
        <Breadcrumb title='AddNewUser' />

        {/* AddUserLayer */}
        <AddUserLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
