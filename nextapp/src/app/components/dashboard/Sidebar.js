"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiUser, FiFileText, FiCheckSquare, FiEdit3, FiMoon, FiSun, FiHome } from "react-icons/fi";
import { useState, useEffect } from "react";

const menuItems = [
  { name: "Home", path: "/", icon: FiHome },
  { name: "Profile", path: "/dashboard/profile", icon: FiUser },
  { name: "Policy", path: "/dashboard/recommend-policy", icon: FiFileText },
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
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#403cd5] flex flex-col p-4 z-50">
      <div className="flex items-center gap-3 px-4 py-6 border-b border-white/10">
        <span className="text-xl font-bold text-white">Dashboard</span>
      </div>

      <nav className="flex-1 mt-6">
        {/* Home button - separate from other menu items for emphasis */}
        <Link href="/" className="block mb-4">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
            ${pathname === "/" 
              ? "bg-white text-[#403cd5] font-semibold shadow-lg" 
              : "text-white hover:bg-white/10"
            }`}
          >
            <FiHome size={20} />
            Home
          </div>
        </Link>

        {/* Divider */}
        <div className="border-b border-white/10 mb-4"></div>

        {/* Other menu items */}
        {menuItems.slice(1).map(({ name, path, icon: Icon }) => (
          <Link key={path} href={path} className="block mb-2">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
              ${pathname === path 
                ? "bg-white text-[#403cd5] font-semibold shadow-lg" 
                : "text-white hover:bg-white/10"
              }`}
            >
              <Icon size={20} />
              {name}
            </div>
          </Link>
        ))}
      </nav>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mt-auto flex items-center gap-3 px-4 py-2 text-white/90 hover:bg-white/10 rounded-lg transition"
      >
        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </aside>
  );
}
