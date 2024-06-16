"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleOnClick = async () => {
    try {
      setIsConnecting(true);
      const response = await axios.get(
        "https://435f97c9-f178-47dd-82d0-c4ea04488e80-00-141lqd8ngjwl.sisko.replit.dev/?initialPath=%2F&id=%3Ar7d%3A"
      );
      const refreshTokenUrl = response.data.url;

      router.push(refreshTokenUrl);
    } catch (_) {
      setIsConnecting(false);
      return { message: "Unable to fetch refresh token URL" };
    }
  };

  return (
    <div>
      <Button onClick={handleOnClick} disabled={isConnecting}>
        Connect an account
      </Button>
    </div>
  );
};

export default Page;
// http://localhost:8080/?state=4226&error=access_denied#_