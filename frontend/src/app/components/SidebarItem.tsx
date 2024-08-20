"use client";

import React from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label }) => {
  return (
    <div className="flex items-center gap-4 p-2 text-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer">
      {icon}
      {label}
    </div>
  );
};
