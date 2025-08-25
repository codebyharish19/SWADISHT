"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

const UploadExample = () => {
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortController = new AbortController();

  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      const { signature, expire, token } = data;
      const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!; 
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    const file = fileInput.files[0];

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
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
      console.log("Upload response:", uploadResponse);
      alert("File uploaded successfully!");
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-background shadow-lg rounded-2xl border border-gray-200 font-body">
      <h2 className="text-2xl font-header font-bold text-primary mb-4 text-center">
        Upload a File
      </h2>

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

        <div className="w-full">
          <label className="block text-sm font-medium text-text mb-1">
            Upload Progress
          </label>
          <progress
            value={progress}
            max={100}
            className="w-full h-3 rounded-lg overflow-hidden [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-tertiary [&::-moz-progress-bar]:bg-tertiary"
          ></progress>
          <p className="text-sm text-gray-600 mt-2 text-center">
            {progress.toFixed(0)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadExample;
