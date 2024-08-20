
"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();

  // Defina as rotas onde a Sidebar não deve aparecer
  const noSidebarPaths = ["/telaLogin", "/cadastro"];
  const shouldRenderSidebar = !noSidebarPaths.includes(pathname);

  return (
    <div className="min-h-screen flex">
      {shouldRenderSidebar && <Sidebar />}
      <div className={`flex-1 ${shouldRenderSidebar ? "p-10" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default LayoutWrapper;
