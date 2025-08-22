import React from 'react'
import Register from '../components/register'

function RegisterPage() {
  return (
    <div className='w-full h-screen flex flex-col bg-white lg:flex-row'>
      {/* Left Side - Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6'>
        <Register />
      </div>

      {/* Right Side - Image (hidden on mobile) */}
      <div 
        className='hidden lg:block lg:w-1/2 h-full bg-cover bg-center'
        style={{ backgroundImage: "url('https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg')" }}
      >
      </div>
    </div>
  )
}

export default RegisterPage
