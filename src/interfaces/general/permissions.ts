import { ReactNode } from "react";

export interface Permission {
    id: string;
    name: string;
};
  
export interface UserPermissions {
    permissions: Permission[];
    hasPermission: (permissionId: string) => boolean;
};

export interface ProtectedRouteProps {
    children: ReactNode;
    requiredPermissions: number[];
    fallback?: ReactNode;
};