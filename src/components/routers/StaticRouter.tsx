"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { usePermissions } from '@/hooks/context/usePermissions';
import { ProtectedRouteProps } from '@/interfaces/user/general/permissions';

const ProtectedRoute = ({
  children,
  requiredPermissions,
  fallback = null,
}: ProtectedRouteProps) => {
  const router = useRouter();
  const { hasAnyPermission } = usePermissions();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const hasAccess = hasAnyPermission(requiredPermissions);

  useEffect(() => {
    if (isMounted && !hasAccess && requiredPermissions.length > 0) {
      router.push('/403');
    }
  }, [hasAccess, router, requiredPermissions, isMounted]);

  if (!isMounted) return null;
  if (!hasAccess) {
    return fallback;
  }

  return <>{children}</>;
};

export default ProtectedRoute;