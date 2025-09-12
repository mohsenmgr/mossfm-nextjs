// app/admin/page.tsx
"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/amin/dashboard"); // go to protected dashboard if already logged in
    }
  }, [status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-950 to-green-800 p-6">
      <div className="bg-gray-900 text-white rounded-xl p-8 shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Admin login</h2>
        <p className="mb-6 text-sm text-gray-300">Sign in to manage your site</p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/amin/dashboard" })}
          className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-500 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}