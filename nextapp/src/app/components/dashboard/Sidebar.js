"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiUser, FiFileText, FiCheckSquare, FiEdit3, FiMoon, FiSun, FiHome, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";

const menuItems = [
  { name: "Home", path: "/", icon: FiHome },
  { name: "Profile", path: "/dashboard/profile", icon: FiUser },
  { name: "Policy", path: "/dashboard/recommend-policy", icon: FiFileText },
  { name: "Voting", path: "/dashboard/voting-policy", icon: FiCheckSquare },
  { name: "Apply Policy", path: "/dashboard/apply-policy", icon: FiEdit3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          className="p-2 bg-[#403cd5] rounded-lg text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen bg-[#403cd5] flex flex-col transition-all duration-300 z-50
        md:translate-x-0
        ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:w-16'}`}>
        <div className="flex items-center justify-between px-4 py-6 border-b border-white/10">
          {(isOpen || !isOpen) && <span className="text-xl font-bold text-white md:hidden">Dashboard</span>}
          {isOpen && <span className="text-xl font-bold text-white hidden md:block">Dashboard</span>}
          <button 
            className="text-white hover:bg-white/10 p-2 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        <nav className="flex-1 mt-6">
          {menuItems.map(({ name, path, icon: Icon }) => (
            <div key={path} className="group relative">
              <Link href={path}>
                <div className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all duration-300
                  ${pathname === path 
                    ? "bg-white text-[#403cd5] font-semibold shadow-lg" 
                    : "text-white hover:bg-white/10"
                  }
                  ${!isOpen ? 'justify-center' : ''}`}
                >
                  <Icon size={20} />
                  {isOpen && <span>{name}</span>}
                </div>
              </Link>
              {!isOpen && (
                <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-lg 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm">
                  {name}
                </div>
              )}
            </div>
          ))}
        </nav>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`mt-auto flex items-center gap-3 px-4 py-2 text-white/90 hover:bg-white/10 rounded-lg transition mb-4
            ${!isOpen ? 'justify-center' : ''}`}
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          {isOpen && (darkMode ? "Light Mode" : "Dark Mode")}
        </button>
      </aside>
    </>
  );
}
