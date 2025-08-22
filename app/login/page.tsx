import React from 'react'
import Login from '../components/login'

function LoginPage() {
  return (
    <div className='w-full h-screen flex flex-col bg-white lg:flex-row'>
      {/* Left Side - Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6'>
        <Login />
      </div>

      {/* Right Side - Image (hidden on mobile) */}
      <div
        className='hidden lg:block lg:w-1/2 h-full bg-cover bg-center'
        style={{ backgroundImage: "url('https://images.pexels.com/photos/4190997/pexels-photo-4190997.jpeg')" }}
      >
      </div>
    </div>
  )
}

export default LoginPage
