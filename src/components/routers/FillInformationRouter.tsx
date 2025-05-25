import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { usePermissions } from '@/hooks/context/usePermissions';
import { ProtectedRouteProps } from '@/interfaces/general/permissions';

const ProtectedRoute = ({
  children,
  requiredPermissions,
  fallback = null,
}: ProtectedRouteProps) => {
  const router = useRouter();
  const { hasPermission } = usePermissions();

  const hasAllPermissions = requiredPermissions.every(perm => hasPermission(perm));

  useEffect(() => {
    if (!hasAllPermissions && requiredPermissions.length > 0) {
      router.push('/403');
    }
  }, [hasAllPermissions, router, requiredPermissions]);

  if (!hasAllPermissions) {
    return fallback;
  }

  return <>{children}</>;
};

export default ProtectedRoute;