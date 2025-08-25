'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { IProduct } from "@/models/Product";
import ProductDisplay from "../components/ProductDisplay";
import { useCartContext } from "@/context/CartContext";
const MyComponent = () => {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart, removeFromCart , cartItems, totalPrice, clearCart } = useCartContext();
  

  useEffect(() => {
    if (session) {
      const fetchProducts = async () => {
        try {
          const res = await fetch("/api/products");
          if (!res.ok) throw new Error("Failed to fetch products");

          const data: IProduct[] = await res.json();
          setProducts(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoadingProducts(false);
        }
      };

      fetchProducts();
    }
  }, [session]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>You are not logged in. Please log in.</div>;

  const { user } = session;

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <p>Your role is: {user?.role}</p>
      <p>Your user ID is: {user?.id}</p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Products</h2>
          <ProductDisplay products={products} />

        {loadingProducts && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

       
      </div>
    </div>
  );
};

export default MyComponent;
