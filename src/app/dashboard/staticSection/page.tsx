"use client";

import MainCard from "@/components/customContiner/MainCard";

export default function StaticSectionsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainCard>{children}</MainCard>;
}