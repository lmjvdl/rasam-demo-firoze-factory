// app/dashboard/layout.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import MainCard from "@/components/customContiner/MainCard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <MainCard>
      {children}
    </MainCard>
  );
}
