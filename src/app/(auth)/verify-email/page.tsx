"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from 'react';
import axios from "axios";
const page = () => {
  const searchParams = useSearchParams();
  const paramToken = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!paramToken) return; // Ensure token exists before making the request

    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`, { token: paramToken })
      .then((response) => {

        window.location.href = '/login';

      })
      .catch((error) => {
        console.log(error);
      });

  }, [paramToken]); // Add paramToken as a dependency

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
        <div className="animate-spin h-5 w-5 border-b-2 border-blue-500 rounded-full"></div>
        <p className="mt-4 text-lg text-gray-700">
          Please wait while we are verifying your token
        </p>
      </div>
    </div>
  );
}

export default page;
