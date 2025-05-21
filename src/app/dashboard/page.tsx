"use client"

import MainCard from "@/components/customContiner/MainCard";
import { useAuthStore } from "@/hooks/context/authStore";
import { useFetchAndSyncProductLines } from "@/hooks/user/useProductLineInfo";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const UserPanel = ({ children }: Props) => {
  const isLoggedIn = useAuthStore((s) => !!s.id);
  const [ready, setReady] = useState(false);

  useFetchAndSyncProductLines();

  useEffect(() => {
    if (isLoggedIn) {
      setReady(true);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return <div>لطفاً وارد شوید</div>;
  if (!ready) return <div>در حال بارگذاری...</div>;

  return <MainCard>{children}</MainCard>;
};

export default UserPanel;
