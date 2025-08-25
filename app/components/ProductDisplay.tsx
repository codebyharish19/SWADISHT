'use client';

import React from 'react';

import { IProduct } from '@/models/Product';

interface ProductDisplayProps {
  products: IProduct[];
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ products }) => {
  return (
    <div className="container mx-auto px-6 py-10">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-primary mb-8">Our Products</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.name} className="bg-white shadow-lg rounded-2xl overflow-hidden">
            {/* Product Image */}
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-primary">{product.name}</h3>
              <p className="text-sm text-secondary my-2">{product.description}</p>
              <p className="text-lg font-bold text-primary">${product.price}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>

            {/* Action Button */}
            <div className="p-4">
              <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
