"use client";
import Sidebar from "../components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-[calc(100vh-64px)] mt-16 bg-[#403cd5]/5">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        {children} {/* This will render the selected dashboard section */}
      </div>
    </div>
  );
}
