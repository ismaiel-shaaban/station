"use client"
import DashBoardLayerOne from "@/components/common/DashBoardLayerOne";
import MasterLayout from "@/masterLayout/MasterLayout";
import { Breadcrumb } from "react-bootstrap";

// export const metadata = {
//   title: "المحطة",
//   description:
//     "",
// };

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='AI' />

        {/* DashBoardLayerOne */}
        <DashBoardLayerOne />
      </MasterLayout>
    </>
  );
};

export default Page;
