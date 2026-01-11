"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ThemeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/customise");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Redirecting to Customise...</p>
    </div>
  );
}
