'use client'
import React from 'react'

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Desktop Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover hidden lg:block"
        src="https://videos.pexels.com/video-files/854082/854082-hd_1920_1080_25fps.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Mobile / Tablet Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center lg:hidden"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg')" }}
      />

      {/* Dark + Light Overlay (to make background lighter & text readable) */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 bg-white/10"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 text-center flex flex-col items-center">
        <h1 className="text-4xl lg:text-6xl font-header font-bold mb-4 text-tertiary drop-shadow-lg">
          Taste the Tradition, Served with Love
        </h1>
        <p className="text-lg lg:text-xl font-body text-gray-100 mb-6">
          Delighting palates with authentic flavors made to bring people together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/menu"
            className="bg-primary hover:bg-secondary text-white font-header px-6 py-3 rounded-xl shadow-lg transition"
          >
            Explore Menu
          </a>
          <a
            href="/about"
            className="bg-white text-primary hover:text-secondary font-header px-6 py-3 rounded-xl shadow-lg transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
