// hooks/useCart.ts
'use client'
import { useState } from 'react';
import { IProduct } from '@/models/Product'; // Assuming you have IProduct model

// Extend IProduct to include quantity in the cart
interface CartItem extends IProduct {
  quantity: number; // Track the quantity of each product in the cart
}

export default function useCart() {
  // Cart state to store cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add product to the cart or increase quantity if the product already exists
  const addToCart = (product: IProduct) => {
    setCartItems((prevCart) => {
      // Check if the product already exists in the cart
      const existingProduct = prevCart.find((item) => item._id === product._id);

      if (existingProduct) {
        // If the product exists, increase the quantity
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 } // Increase quantity by 1
            : item
        );
      }

      // If the product doesn't exist, add it with quantity 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove product from cart by its ID
  const removeFromCart = (productId: string) => {
    setCartItems((prevCart) => prevCart.filter((item) => item._id?.toString() !== productId));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price of all items in the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  // Return cart state and functions to manage the cart
  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    totalPrice,
  };
}
