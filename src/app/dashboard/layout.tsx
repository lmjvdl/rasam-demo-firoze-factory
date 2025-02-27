// app/dashboard/layout.tsx
"use client";

import { useAuthStore } from "@/hooks/context/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import MainCard from "@/components/CustomContiner/MainCard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const pathname = usePathname();

  useEffect(() => {
    if (isLoggedIn === null) return;
    if (!isLoggedIn) {
      router.replace("/login");
    } else if (isLoggedIn && !isAdmin) {
      router.replace(pathname)
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return <LoadingScreen />;

  return (
    <MainCard>
      {children}
    </MainCard>
  );
}
