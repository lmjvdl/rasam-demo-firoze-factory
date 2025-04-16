"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/context/authStore";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";


export default function HomePage() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAdmin = useAuthStore((state) => state.isAdmin);
 
  useEffect(() => {
    if (isLoggedIn) {
      router.replace(isAdmin ? "/admin/user" : "/dashboard");
    } else if(!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, isAdmin]);

  return <LoadingScreen />;
}
