import HomeLayout from "@/components/layouts/HomeLayout";
import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default ProtectedLayout;
