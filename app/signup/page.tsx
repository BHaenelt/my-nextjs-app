"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    console.log("SignupPage is rendering!");
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: '',
        password: '',
        username: '',
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevents page refresh
        
        try {
            setLoading(true);
            console.log("Attempting signup with:", user);
            
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success!", response.data);
            
            alert("Signup successful! Please login.");
            router.push("/login");
            
        } catch (error: any) {
            console.log("Signup failed:", error);
            alert("Signup failed: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        // Blue webpage background
        <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-blue-600">
           
           {/* White signup form container */}
           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h1 className="text-gray-900 text-4xl mb-4 text-center">
                 {loading ? "Processing..." : "Signup"}
              </h1> 
              <hr className="w-full mb-6" />
              
              <form onSubmit={onSignup} className="w-full">
                 <label htmlFor="username" className="text-gray-700 mb-2 block">
                    Username
                 </label>
                 <input
                    className="border-2 p-2 mb-4 rounded text-black w-full bg-white"
                    id="username"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    type="text"
                    placeholder="username"
                    required
                 />
       
                 <label htmlFor="email" className="text-gray-700 mb-2 block">
                    Email
                 </label>
                 <input
                    className="border-2 p-2 mb-4 rounded text-black w-full bg-white"
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
                    className="border-2 p-2 mb-4 rounded text-black w-full bg-white"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    type="password"
                    placeholder="password"
                    required
                 />

                 <button 
                    type="submit"
                    disabled={buttonDisabled || loading}
                    className="p-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600 w-full disabled:bg-gray-400"
                 >
                    {loading ? "Processing..." : "Sign Up Here"}
                 </button>
              </form>

              <Link href="/login" className="text-blue-600 hover:underline block text-center">
                 Already have an account? Login
              </Link>
           </div>
        </div>
    );
}