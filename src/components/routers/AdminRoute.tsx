"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/context/authStore";

interface Props {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: Props) {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      router.replace("/admin/user");
    } else if(isLoggedIn && !isAdmin){
      router.replace("/login");
    }
  }, [isLoggedIn, isAdmin, router]);

  return <>{children}</>;
}
