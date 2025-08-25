'use client';

import { useState, useRef } from 'react';
import { ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload } from '@imagekit/next';

const UploadAndCreateProduct = () => {
  const [urlofProduct, setUrlofProduct] = useState('');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortController = new AbortController();

  // Product details state
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '', // Store imageUrl here
  });

  // Authenticator for ImageKit
  const authenticator = async () => {
    try {
      const response = await fetch('/api/imagekit-auth');
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      const { signature, expire, token } = data;
      const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error('Authentication error:', error);
      throw new Error('Authentication request failed');
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert('Please select a file to upload');
      return;
    }

    const file = fileInput.files[0];

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error('Failed to authenticate for upload:', authError);
      return;
    }

    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortController.signal,
      });
      const { url } = uploadResponse;
      setUrlofProduct(url as string); // Set the uploaded image URL here
      setProductDetails((prev) => ({
        ...prev,
        imageUrl: url as string, // Set imageUrl in the product details state
      }));
      console.log('Uploaded file URL:', url);
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error('Upload aborted:', error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error('Invalid request:', error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error('Network error:', error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error('Server error:', error.message);
      } else {
        console.error('Upload error:', error);
      }
    }
  };

  // Handle product detail changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle product creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!productDetails.imageUrl) {
        alert('Please upload an image for the product');
        return;
      }

      console.log('Product details:', productDetails);

      // Send product data to backend API
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productDetails), // Send the product details with the image URL
      });

      if (response.ok) {
        alert('Product created successfully');
        setProductDetails({ name: '', description: '', price: 0, category: '', imageUrl: '' });
        setUrlofProduct('');
      } else {
        const errorData = await response.json();
        alert(`Failed to create product: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('An error occurred while creating the product');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-background shadow-lg rounded-2xl border border-gray-200 font-body">
      <h2 className="text-2xl font-header font-bold text-primary mb-4 text-center">Upload and Create a Product</h2>

      {/* File Upload Section */}
      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          ref={fileInputRef}
          className="block w-full text-sm text-text border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleUpload}
          className="w-full py-2 px-4 rounded-lg bg-primary text-white font-semibold hover:bg-secondary transition"
        >
          Upload File
        </button>

        {/* Progress Bar */}
        <div className="w-full">
          <label className="block text-sm font-medium text-text mb-1">Upload Progress</label>
          <progress
            value={progress}
            max={100}
            className="w-full h-3 rounded-lg overflow-hidden [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-tertiary [&::-moz-progress-bar]:bg-tertiary"
          ></progress>
          <p className="text-sm text-gray-600 mt-2 text-center">{progress.toFixed(0)}%</p>
        </div>
      </div>

      {/* Product Creation Section */}
      {urlofProduct && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={productDetails.name}
              onChange={handleInputChange}
              className="block w-full text-sm text-text border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={productDetails.description}
              onChange={handleInputChange}
              className="block w-full text-sm text-text border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={productDetails.price}
              onChange={handleInputChange}
              className="block w-full text-sm text-text border border-gray-300 rounded-lg p-2"
              required
              min={0}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={productDetails.category}
              onChange={handleInputChange}
              className="block w-full text-sm text-text border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Hidden Product Image URL */}
          <input type="hidden" name="imageUrl" value={urlofProduct} />

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-primary text-white font-semibold hover:bg-secondary transition"
            >
              Create Product
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UploadAndCreateProduct;
