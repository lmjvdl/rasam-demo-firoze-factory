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

  useEffect(() => {
    if (isLoggedIn === null) return; // Avoid action if logged-in status is unknown
    if (!isLoggedIn) {
      router.replace("/login");
    } else {
      router.replace("/admin");
    }
  }, [isLoggedIn, router]);

  return <>{children}</>;
}
