"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react"; // Note: getToken() is for API routes; use getSession() on client side

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession(); // This works client-side
      if (!session) {
        router.push("/sign-in");
      } else {
        router.push("/dashboard");
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      <p className="ml-4 text-lg">Redirecting to dashboard...</p>
    </div>
  );
}
