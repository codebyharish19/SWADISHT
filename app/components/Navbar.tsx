'use client'
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav x-data="{ open: false }" className="bg-primary text-white py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-3xl font-bold font-header text-white">
          Swadisht
        </a>

        {/* Hamburger Icon (Mobile) */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <a href="/" className="navbar-item hover:text-tertiary">Home</a>
          <a href="/about" className="navbar-item hover:text-tertiary">About</a>
          <a href="/menu" className="navbar-item hover:text-tertiary">Menu</a>
          <a href="/signin" className="navbar-item hover:text-tertiary">Sign In</a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:hidden absolute left-0 top-16 w-full bg-primary py-4 px-6 space-y-4 flex flex-col`}
      >
        <a href="/" className="navbar-item text-white hover:text-tertiary">
          Home
        </a>
        <a href="/about" className="navbar-item text-white hover:text-tertiary">
          About
        </a>
        <a href="/menu" className="navbar-item text-white hover:text-tertiary">
          Menu
        </a>
        <a href="/signin" className="navbar-item text-white hover:text-tertiary">
          Sign In
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
