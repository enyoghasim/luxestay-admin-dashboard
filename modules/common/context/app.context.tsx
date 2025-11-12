"use client";
import { getQueryClient } from "@/modules/common/services/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const AppContext = React.createContext(undefined);

export const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={undefined}>{children}</AppContext.Provider>
    </QueryClientProvider>
  );
};
