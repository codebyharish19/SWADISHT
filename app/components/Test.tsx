"use client";

import { useEffect } from "react";
import { Image, ImageKitProvider } from "@imagekit/next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;
if (!urlEndpoint) {
  throw new Error("NEXT_PUBLIC_URL_ENDPOINT is not defined");
}

type IKAuthResponse = {
  token: string;
  signature: string;
  expire: number;
};

export default function Test() {
  // Function to fetch auth from your backend
  const getImageKitAuth = async (): Promise<IKAuthResponse> => {
    try {
      const res = await fetch("/api/imagekit-auth");
      if (!res.ok) throw new Error("Failed to authenticate");

      const data: IKAuthResponse = await res.json();
      console.log("ImageKit auth response:", data);

      return data;
    } catch (error) {
      console.error("ImageKit authentication error:", error);
      throw error;
    }
  };

  // Call it once on mount
  useEffect(() => {
    getImageKitAuth();
  }, []);

  return (
      <Image
        src="/default-image.jpg"
        width={500}
        height={500}
        alt="Picture of the author"
        loading="lazy"
      />
  );
}
