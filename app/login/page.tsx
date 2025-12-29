"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    console.log("LoginPage is rendering!");
    const router = useRouter();
    
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = React.useState(false);

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevents page refresh
        
        try {
            setLoading(true);
            console.log("Attempting login with:", user);
            
            const response = await axios.post("/api/users/login", user);
            console.log("Login success!", response.data);
            
            alert("Login successful!");
            router.push("/profile");
            
        } catch (error: any) {
            console.log("Login failed:", error);
            alert("Login failed: " + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        // Blue webpage background
        <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-blue-600">
           
           {/* White login form container */}
           <div style={{backgroundColor: 'white'}} className="p-8 rounded-lg shadow-lg w-full max-w-md">
              <h1 className="text-gray-900 text-4xl mb-4 text-center">
                 {loading ? "Logging in..." : "LOGIN"}
              </h1> 
              <hr className="w-full mb-6" />
              
              <form onSubmit={onLogin} className="w-full">
                 <label htmlFor="email" className="text-gray-700 mb-2 block">
                    Email
                 </label>
                 <input
                    style={{backgroundColor: 'white'}}
                    className="border-2 p-2 mb-4 rounded text-black w-full"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    type="email"
                    placeholder="email"
                    required
                 />

                 <label htmlFor="password" className="text-gray-700 mb-2 block">
                    Password
                 </label>
                 <input
                    style={{backgroundColor: 'white'}}
                    className="border-2 p-2 mb-4 rounded text-black w-full"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    type="password"
                    placeholder="password"
                    required
                 />

                 {/* Forgot Password Link */}
                 <div className="text-right mb-4">
                    <Link href="/forgot-password" className="text-blue-600 hover:underline text-sm">
                       Forgot Password?
                    </Link>
                 </div>

                 <button 
                    type="submit"
                    disabled={loading}
                    className="p-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600 w-full disabled:bg-gray-400"
                 >
                    {loading ? "Loading..." : "Log In Here"}
                 </button>
              </form>

              <Link href="/signup" className="text-blue-600 hover:underline block text-center">
                 Don't have an account? Sign up
              </Link>
           </div>
        </div>
    );
}