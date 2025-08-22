'use client'
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useNotification } from "./Notification";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const router = useRouter();
     const { showNotification } = useNotification();


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", { email, password });
    // Add backend integration here
      const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
     if (result?.error) {
      showNotification(result.error, "error");
    } else {
      showNotification("Login successful!", "success");
      router.push("/");
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        {/* Title */}
        <h2 className="text-3xl font-bold font-header text-center text-primary mb-6">
          Welcome Back
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text font-body mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none font-body"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-text font-body mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:outline-none font-body"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-header font-semibold py-3 rounded-xl transition duration-300 shadow-md"
          >
            Log In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 font-body mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-primary hover:text-secondary font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
