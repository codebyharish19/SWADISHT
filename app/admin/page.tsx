import React from 'react'
import UploadAndCreateProduct from '../components/UploadAndCreateProduct '

function adminpage() {
  return (
    <div className="min-h-screen bg-background text-primary font-body">
      <div className="max-w-screen-xl mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-lg text-secondary mt-2">Manage your products efficiently</p>
        </header>

        <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
          <h2 className="text-3xl font-header text-primary text-center">Upload and Create Product</h2>
          
          {/* Upload and create product component */}
          <UploadAndCreateProduct />
        </div>
      </div>
    </div>
  )
}

export default adminpage