import AuthLayout from "@/components/layouts/AuthLayout";
import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-blue-900 h-screen pt-52">
      {children}
    </div>
  );
};

export default ProtectedLayout;
