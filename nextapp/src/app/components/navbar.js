"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Language dropdown toggle
  const pathname = usePathname();

  // Check login status
  useEffect(() => {
    const user = localStorage.getItem("userEmail");
    const admin = localStorage.getItem("adminEmail");
    setIsLoggedIn(!!user);
    setIsAdminLoggedIn(!!admin);
  }, [pathname]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const handleAdminLogout = () => {
    localStorage.clear();
    setIsAdminLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 sm:px-8 py-4 flex justify-between items-center transition-all duration-300 ${
        isScrolled ? "bg-black bg-opacity-60 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img
          src="/images/logo.png" // Replace with your logo image
          alt="Logo"
          className="w-10 h-10 md:w-16 md:h-26 mx-auto md:mx-0 mb-4 shadow-md"
        />
        <span className="text-lg font-bold tracking-wide text-white">
          Holy Trinity
        </span>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="sm:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navigation Links - Desktop */}
      <ul className="hidden sm:flex space-x-8 text-sm sm:text-base text-white">
        {[
          { href: "/", label: "HOME" },
          { href: "/reports", label: "REPORT" },
          { href: "/community", label: "COMMUNITY" },
          { href: "/features", label: "FEATURES" },
          { href: "/aboutus", label: "ABOUT US" },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="hover:text-[#6DBE47] transition duration-300">
              {label}
            </Link>
          </li>
        ))}
        {/* Language Dropdown */}
        <li className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 hover:text-[#6DBE47] transition duration-300"
          >
            <span>Language</span>
            <ChevronDown size={16} />
          </button>
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg">
              {["English", "Spanish", "French", "German", "Chinese"].map((lang) => (
                <li key={lang} className="px-4 py-2 hover:bg-[#6DBE47] hover:text-white transition duration-300">
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>

      {/* User Login/Signup & Admin Login - Desktop */}
      <div className="hidden sm:flex space-x-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-6 py-2 text-[#8974e8] bg-[#3819b4] font-semibold rounded-full shadow-md hover:bg-[#14470D] hover:text-white transition-all duration-300"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="px-6 py-2 text-[#ffffff] bg-[#6e1cba] border-[#6f21a6] rounded-full hover:bg-[#8974e8] hover:text-black transition-all duration-300"
          >
            Login
          </Link>
        )}

        {isAdminLoggedIn ? (
          <button
            onClick={handleAdminLogout}
            className="px-5 py-2 text-white border border-[#8974e8] rounded-full hover:bg-[#8974e8] hover:text-black transition-all duration-300"
          >
            Admin Logout
          </button>
        ) : (
          <Link
            href="/admin/login"
            className="px-5 py-2 text-white border border-[#8974e8] rounded-full hover:bg-[#8974e8] hover:text-black transition-all duration-300"
          >
            Login as Admin
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-black bg-opacity-80 backdrop-blur-md p-6 flex flex-col space-y-4 sm:hidden">
          {[
            { href: "/", label: "HOME" },
            { href: "/reports", label: "REPORT" },
            { href: "/community", label: "COMMUNITY" },
            { href: "/features", label: "FEATURES" },
            { href: "/aboutus", label: "ABOUT US" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-white text-lg text-center hover:text-[#6DBE47] transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div className="flex flex-col space-y-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-6 py-2 text-[#8974e8] bg-[#3819b4] font-semibold rounded-full shadow-md hover:bg-[#14470D] hover:text-white transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="px-6 py-2 text-[#ededed] bg-[#3819b4] font-semibold rounded-full shadow-md hover:bg-[#14470D] hover:text-white transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}

            {isAdminLoggedIn ? (
              <button
                onClick={handleAdminLogout}
                className="px-5 py-2 text-white border border-[#8974e8] rounded-full hover:bg-[#8974e8] hover:text-black transition-all duration-300"
              >
                Admin Logout
              </button>
            ) : (
              <Link
                href="/admin/login"
                className="px-5 py-2 text-white border border-[#8974e8] rounded-full hover:bg-[#8974e8] hover:text-black transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login as Admin
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}