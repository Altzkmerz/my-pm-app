'use client';

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className={`transition-all duration-300 ${
          collapsed ? 'ml-16' : 'ml-64'
        } p-6 w-full`}
      >
        {children}
      </main>
    </div>
  );
}
