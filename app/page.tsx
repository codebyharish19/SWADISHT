'use client'
import React, { useState } from 'react'
import Hero from '@/app/components/Hero'
import { CartItem } from '@/context/CartContext'
import { IProduct } from '@/models/Product';
import useCart from "@/lib/helper/useContextVal";
import { CartProvider } from "@/context/CartContext";



function page() {
 const { cartItems, addToCart, removeFromCart, clearCart,totalPrice } = useCart();
 
  
  return (
    <CartProvider value={{ cartItems, addToCart, removeFromCart, clearCart,totalPrice }}>
     <div className='w-full h-screen'>
      <Hero />
    </div> 
    
    </CartProvider>

                     
   

   
  )
}

export default page