"use client"
import Breadcrumb from "@/components/common/Breadcrumb";
import Banners from "@/components/banners/ListLayer";
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
        <Banners />
      </MasterLayout>
    </>
  );
};

export default Page; 