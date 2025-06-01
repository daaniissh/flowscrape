import Logo from "@/components/Logo";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center flex-col h-screen gap-4">
      <Logo />
      {children}
    </div>
  );
};

export default layout;
