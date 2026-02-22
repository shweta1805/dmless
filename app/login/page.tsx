"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    localStorage.setItem("recruiter", email);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">
      <h1 className="text-2xl font-bold">Recruiter Login</h1>

      <input
        type="email"
        placeholder="Enter your email"
        className="border p-2 rounded w-64"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}