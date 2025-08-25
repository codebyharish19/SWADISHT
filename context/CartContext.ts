'use client'
import React, { createContext, useContext, useState } from 'react';
import { IProduct } from '../models/Product'; // Assuming your product interface is here

// Extend the IProduct interface to handle quantity
export interface CartItem extends IProduct {
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider=CartContext.Provider

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

