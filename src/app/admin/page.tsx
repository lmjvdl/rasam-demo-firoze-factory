"use client";

import AdminRoute from "@/components/routers/AdminRoute";

interface Props {
  children: React.ReactNode;
}

export default function AdminPage({ children }: Props) {
  return (
    <AdminRoute>
        {children}
    </AdminRoute>
  );
}
