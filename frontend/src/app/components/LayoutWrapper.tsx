
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
  const noSidebarPaths = ["/telaLogin", "/telaCadastro"];
  const shouldRenderSidebar = !noSidebarPaths.includes(pathname);

  return (
    <div className="min-h-screen flex bg-blue-100">
      {shouldRenderSidebar && <Sidebar />}
      <div className={`flex-1 ${shouldRenderSidebar ? "pl-16 md:pl-30" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default LayoutWrapper;
