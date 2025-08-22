'use client'
import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-header font-bold">Swadisht</h2>
          <p className="font-body text-sm mt-2 text-gray-200">
            Taste the tradition, served with love.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row justify-center md:space-x-8 text-center md:text-left space-y-4 md:space-y-0">
          <a href="/about" className="hover:text-tertiary font-body transition">About</a>
          <a href="/menu" className="hover:text-tertiary font-body transition">Menu</a>
          <a href="/contact" className="hover:text-tertiary font-body transition">Contact</a>
          <a href="/signin" className="hover:text-tertiary font-body transition">Sign In</a>
        </div>

        {/* Socials */}
        <div className="flex justify-center md:justify-end space-x-6 text-white">
          <a href="#" className="hover:text-tertiary transition">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="hover:text-tertiary transition">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-tertiary transition">
            <FaTwitter size={20} />
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-300 font-body mt-8">
        © {new Date().getFullYear()} Swadisht. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
