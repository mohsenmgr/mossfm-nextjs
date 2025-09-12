"use client";

import React, { useState } from "react";
import Link from "next/link";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      <header className="site-header sticky top-0 z-50 bg-gray-900 shadow-lg backdrop-blur-sm px-6 h-20 flex items-center w-full">
        <div className="grid grid-cols-[auto_1fr_auto] items-center flex-1 gap-4">
          <div className="text-2xl font-extrabold text-white select-none text-center whitespace-nowrap">
             <Link
              href="/"
            >
            Mohsen FM
            </Link>
          </div>
        </div>

        {/* Hamburger Button */}
        <button
          id="menu-btn"
          aria-label="Toggle menu"
          onClick={toggleMenu}
          className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col justify-center items-center w-10 h-10 space-y-1 focus:outline-none z-50"
        >
          <span
            className={`block w-7 h-0.5 bg-gray-300 rounded transition-transform origin-left ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-7 h-0.5 bg-gray-300 rounded transition-opacity ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-7 h-0.5 bg-gray-300 rounded transition-transform origin-left ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-gray-300 font-medium ml-6 place-items-center">
          <li>
            <Link
              href="/"
              className="hover:text-green-200 transition-colors duration-300 ease-in-out"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-green-200 transition-colors duration-300 ease-in-out"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/work"
              className="hover:text-green-200 transition-colors duration-300 ease-in-out"
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-green-200 transition-colors duration-300 ease-in-out"
            >
              Contact
            </Link>
          </li>
          <Link
             href="/api/cv"
            className="relative overflow-hidden border border-white text-white px-5 py-2 rounded-md font-semibold transition-colors duration-500 group"
          >
            <span className="absolute inset-0 bg-green-200 origin-bottom-left scale-x-0 transition-transform duration-700 ease-in-out group-hover:scale-x-100"></span>
            <span className="relative z-10 transition-colors duration-500 group-hover:text-gray-900">
              Curriculum Vitae
            </span>
          </Link>
        </ul>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-gray-900 bg-opacity-95 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col p-4 gap-4 text-gray-300 font-medium">
          <li>
            <Link
              href="/"
              className="hover:text-green-500 transition-colors duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-green-500 transition-colors duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/work"
              className="hover:text-green-500 transition-colors duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-green-500 transition-colors duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/cv"
              className="hover:text-green-500 transition-colors duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Curriculum Vitae
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Nav;