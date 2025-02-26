// app/admin/layout.tsx
"use client";

import { useAuthStore } from "@/hooks/context/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import MainCard from "@/components/CustomContiner/MainCard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  useEffect(() => {
    if (isLoggedIn === null) return;
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, isAdmin, router]);

  if (!isLoggedIn || !isAdmin) return <LoadingScreen />;

  return (
    <MainCard>
      {children}
    </MainCard>
  );
}
