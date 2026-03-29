"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function NavVisibilityWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isAdminRoute = pathname?.startsWith('/admin');

  // 🛡️ HYDRATION SENTINEL: Ensure server-rendered HTML matches client-side architecture
  if (!isMounted) {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
    </>
  );
}
