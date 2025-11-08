"use client";
import { Button } from "@/modules/common/components/ui/button";
import React from "react";
import { LuMenu } from "react-icons/lu";
import { useSidebarStore } from "../../store/sidebarStore";

const DashboardLayoutUi: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { openSidebar } = useSidebarStore();
  return (
    <section className="md:ml-72 min-[1500px]:ml-auto! max-w-[1500px] mx-auto">
      <header className="sticky md:hidden block top-0 bg-white w-full p-5 border-b border-neutral-200">
        <Button onClick={openSidebar} variant="outline">
          <LuMenu className=" w-5! h-5! shrink-0" />
        </Button>
      </header>
      {children}
    </section>
  );
};

export default DashboardLayoutUi;
