// app/dashboard/layout.tsx
"use client";

import MainCard from "@/components/customContiner/MainCard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <MainCard>
      {children}
    </MainCard>
  );
}
