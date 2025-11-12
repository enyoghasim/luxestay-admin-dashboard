import React from "react";

export const metadata = {
  title: "Luxestay - Listings",
};

const ListingsLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <>{children}</>;
};

export default ListingsLayout;
