import React from "react";

export const metadata = {
  title: "Luxestay - Jets",
};

const JetsLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <>{children}</>;
};

export default JetsLayout;
