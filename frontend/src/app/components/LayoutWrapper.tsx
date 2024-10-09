
"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Defina as rotas onde a Sidebar não deve aparecer
  const noSidebarPaths = ["/telaLogin", "/telaCadastro"];
  const shouldRenderSidebar = !noSidebarPaths.includes(pathname);

  return (
    <div className="min-h-screen flex bg-blue-100">
      {shouldRenderSidebar && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
      {/* Ajuste dinâmico */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "pl-64" : "pl-16"}`}>
        {children}
      </div>
    </div>
  );
};

export default LayoutWrapper;
