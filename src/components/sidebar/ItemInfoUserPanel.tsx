import { useMemo } from "react";
import { deleteUser } from "@/hooks/context/authStore";
import { useProductLineStore } from "@/hooks/context/productLineStore";
import { useAuthStore } from "@/hooks/context/authStore";
import { useColorScheme } from "@mui/material";
import {
  staticDrawerItems,
  staticFooterItems,
} from "./dependencies/ConstansParts";

export const UseItemInfoUserPanel = () => {
  const { companies } = useProductLineStore();
  const { permissions: userPermissions } = useAuthStore();
  const mode = useColorScheme();

  const hasAccess = (requiredPermissions?: number[]) => {
    if (!requiredPermissions) return true;
    return requiredPermissions.some((id) => userPermissions.includes(id));
  };
  
  const drawerItemInfoForUserPanel = useMemo(() => {
    const filteredStaticItems = Object.entries(staticDrawerItems)
      .filter(([, item]) => hasAccess(item.requiredPermissions))
      .reduce((acc, [key, item]) => {
        acc[key] = item;
        return acc;
      }, {} as typeof staticDrawerItems);

    const dynamicProductLines = companies.reduce((acc, company) => {
      company.product_lines.forEach((line) => {
        const iconPath =
          mode.colorScheme === "dark" ? line.dark_icon : line.light_icon;
        acc[line.name] = {
          text: line.name,
          icon: iconPath || "DefaultIcon",
          to: `/dashboard/${line.id}`,
        };
      });
      return acc;
    }, {} as Record<string, { text: string; icon: string; to: string }>);

    return {
      ...filteredStaticItems,
      ...dynamicProductLines,
    };
  }, [companies, userPermissions, mode.colorScheme]);

  const footerItemInfoForUserPanel = useMemo(() => {
    return Object.entries(staticFooterItems)
      .filter(([, item]) => hasAccess(item.requiredPermissions))
      .reduce((acc, [key, item]) => {
        acc[key] = {
          ...item,
          onClick: item.text === "خروج" ? () => deleteUser() : item.onClick,
        };
        return acc;
      }, {} as typeof staticFooterItems);
  }, [userPermissions]);

  return { drawerItemInfoForUserPanel, footerItemInfoForUserPanel };
};
