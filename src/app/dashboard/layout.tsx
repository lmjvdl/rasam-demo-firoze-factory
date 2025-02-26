// app/dashboard/layout.tsx
"use client";

import { useAuthStore } from "@/hooks/context/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import MainCard from "@/components/CustomContiner/MainCard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn === null) return;
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return <LoadingScreen />;

  return (
    <MainCard>
      {children}
    </MainCard>
  );
}
