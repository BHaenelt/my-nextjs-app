"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setMessage("");
      
      const response = await axios.post("/api/auth/forgot-password", { email });
      
      setMessage(response.data.message);
      setEmail("");
      
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-blue-600">
      <div style={{backgroundColor: 'white'}} className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-gray-900 text-4xl mb-4 text-center">
          Forgot Password
        </h1>
        <hr className="w-full mb-6" />
        
        <p className="text-gray-600 mb-4 text-center">
          Enter your email and we'll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <label htmlFor="email" className="text-gray-700 mb-2 block">
            Email
          </label>
          <input
            style={{backgroundColor: 'white'}}
            className="border-2 p-2 mb-4 rounded text-black w-full"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <button 
            type="submit"
            disabled={loading}
            className="p-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600 w-full disabled:bg-gray-400"
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        {message && (
          <div className="p-3 mb-4 bg-green-100 text-green-700 rounded text-center">
            {message}
          </div>
        )}

        <Link href="/login" className="text-blue-600 hover:underline block text-center">
          Back to Login
        </Link>
      </div>
    </div>
  );
}