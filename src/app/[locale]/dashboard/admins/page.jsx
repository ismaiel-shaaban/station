import Breadcrumb from "@/components/common/Breadcrumb";
import UsersListLayer from "@/components/admins/ListLayer";
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
        <Breadcrumb title='Branch_manager' />

        {/* UsersListLayer */}
        <UsersListLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
