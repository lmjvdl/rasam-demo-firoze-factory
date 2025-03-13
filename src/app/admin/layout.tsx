// app/admin/layout.tsx
"use client";

import { useAuthStore } from "@/hooks/context/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import MainCard from "@/components/customContiner/MainCard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const pathname = usePathname();

  useEffect(() => {
    if (isLoggedIn === null) return;
    if (!isLoggedIn) {
      router.replace("/login");
    } else if(isAdmin && isLoggedIn){
        router.replace(pathname)
    }
  }, [isLoggedIn, isAdmin, router]);

  if (!isLoggedIn || !isAdmin) return <LoadingScreen />;

  return (
    <MainCard>
      {children}
    </MainCard>
  );
}
