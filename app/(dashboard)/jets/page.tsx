"use client";
import { Button } from "@/modules/common/components/ui/button";
import AddJetModal from "@/modules/jets/components/add-jet-sheet";
import React from "react";
import { LuPlus } from "react-icons/lu";

const JetsPage = () => {
  const [isAddJetModalOpen, setIsAddJetModalOpen] = React.useState(false);
  return (
    <>
      <div className="p-5">
        <nav className="flex flex-row items-center justify-between">
          <h2 className=" md:text-2xl text-lg font-bold">Jets (53)</h2>
          <Button className="" onClick={() => setIsAddJetModalOpen(true)}>
            <LuPlus />
            <span>Create Jet</span>
          </Button>
        </nav>
      </div>

      <AddJetModal
        isOpen={isAddJetModalOpen}
        onClose={() => {
          setIsAddJetModalOpen(false);
        }}
      />
    </>
  );
};

export default JetsPage;
