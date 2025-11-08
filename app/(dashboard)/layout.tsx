import Aside from "@/modules/dashboard/components/aside";
import DashboardLayoutUi from "@/modules/dashboard/components/ui/dashboard-layout";
import React from "react";

export const metadata = {
  title: "Luxestay - Dashboard",
};

const DashboardLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <Aside />
      <DashboardLayoutUi>{children}</DashboardLayoutUi>
    </>
  );
};

export default DashboardLayout;
