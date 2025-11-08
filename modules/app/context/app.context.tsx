"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={undefined}>{children}</AppContext.Provider>
    </QueryClientProvider>
  );
};
