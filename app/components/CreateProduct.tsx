'use client';

import { useState } from 'react';

interface CreateProductProps {
  imageUrl: string; // This will be passed from the parent component (file upload)
}

const CreateProduct: React.FC<CreateProductProps> = ({ imageUrl }) => {
  console.log("Image URL:", imageUrl);
  
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: imageUrl,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!productDetails.imageUrl) {
        alert('Please upload an image for the product');
        return;
      }
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productDetails),
      });

      if (response.ok) {
        alert('Product created successfully');
        setProductDetails({ name: '', description: '', price: 0, category: '', imageUrl: '' });
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
      <h2 className="text-2xl font-header font-bold text-primary mb-4 text-center">
        Create a Product
      </h2>

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

       

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-primary text-white font-semibold hover:bg-secondary transition"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
