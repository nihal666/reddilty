"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const Authentication = () => {
    const searchParams = useSearchParams();
    const code = searchParams.get("code")

    console.log(code)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Authentication</h1>
      </div>
    </div>
  );
};

export default Authentication;
