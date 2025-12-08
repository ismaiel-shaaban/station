import Breadcrumb from "@/components/common/Breadcrumb";
import ViewProfileLayer from "@/components/admins/ViewLayer";
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

        {/* ViewProfileLayer */}
        <ViewProfileLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
