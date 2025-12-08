"use client"
import Breadcrumb from "@/components/common/Breadcrumb";
import ListLayer from "@/components/users/ListLayer";
import MasterLayout from "@/masterLayout/MasterLayout";

// export const metadata = {
//   title: "Merchant Authority",
//   description: "Manage merchant authorities",
// };

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title=" البانرات  " />

        {/* MerchantAuthority */}
        <ListLayer />
      </MasterLayout>
    </>
  );
};

export default Page; 