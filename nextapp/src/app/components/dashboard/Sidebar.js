"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiUser, FiFileText, FiCheckSquare, FiEdit3, FiMoon, FiSun } from "react-icons/fi";
import { useState, useEffect } from "react";

const menuItems = [
  { name: "Profile", path: "/dashboard/profile", icon: FiUser },
  { name: "Policy", path: "/dashboard/policy", icon: FiFileText },
  { name: "Voting", path: "/dashboard/voting", icon: FiCheckSquare },
  { name: "Apply Policy", path: "/dashboard/apply-policy", icon: FiEdit3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md h-screen flex flex-col p-4">
      {/* Dashboard Header */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Dashboard</h2>

      {/* Navigation Links */}
      <nav className="flex-1">
        {menuItems.map(({ name, path, icon: Icon }) => (
          <Link key={path} href={path} className="block">
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${
                  pathname === path
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }
              `}
            >
              <Icon size={20} />
              {name}
            </div>
          </Link>
        ))}
      </nav>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mt-auto flex items-center gap-3 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
      >
        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </aside>
  );
}
