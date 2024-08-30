"use client";

import React from "react";
import Link from "next/link";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string; // Certifique-se de que path é uma string
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, path }) => {
  return (
    <Link href={path}>
      <div className="flex items-center gap-4 p-2 text-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer">
        {icon}
        {label}
      </div>
    </Link>
  );
};
