"use client"; // Enable client-side rendering
import axios from "axios";
import React, {useState} from "react";
import Link from "next/link";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";  
// Import necessary dependencies


// Profile Page Component
export default function ProfilePage() { // the function that defines the ProfilePage component
   const router = useRouter(); // Initialize the router for navigation
const[data,setData]= useState(null);
   const logout = async () => { // saving logout into a variable 
      try {
         await axios.get("/api/users/logout");  // try to call the logout API endpoint
         toast.success("Logged out Successuful"); // show success message
         router.push("/login"); // Redirect to login page after logout
      } catch (error: any) { //if error occures 
         console.log(error.message); // log the error message to the console
      }
   };

const getUserDetails=async()=>
{
  const res= await axios.get("/api/users/me")
console.log(res.data);
setData(res.data.data._id);
}


// retunring the JSX for the porfile page what the user sees, NextJs complies 
// it to HTML/CSS/JS so browser can undertand
   return(  
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-900">
       <h1 className="text-white text-4xl mb-4">Profile Page</h1>
       
       <hr className="w-full max-w-md mb-6" />
       <h2>{data==="nothing"?"nothing":
         <Link href={`/profile/${data}`}>
       </Link>}</h2>
       <button
          onClick={logout}
          className="bg-white text-black font-bold py-2 px-6 rounded hover:bg-gray-200"
       >
          Logout
       </button>
    </div>
   )
}