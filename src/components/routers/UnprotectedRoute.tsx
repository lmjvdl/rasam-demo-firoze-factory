"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/context/authStore";

interface Props {
  children: React.ReactNode;
}

export default function UnprotectedRoute({ children }: Props) {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn]);


  return <>{children}</>;
}
