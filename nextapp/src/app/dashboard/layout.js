"use client";
import Sidebar from "../components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#403cd5]/5">
      <Sidebar />
      <div className="flex-1 ml-64"> {/* Add margin to account for fixed sidebar */}
        <main className="p-8 mt-8">
          {children}
        </main>
      </div>
    </div>
  );
}
