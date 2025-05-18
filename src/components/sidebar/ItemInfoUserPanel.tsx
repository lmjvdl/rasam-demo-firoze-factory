import { useMemo } from "react";
import { deleteUser } from "@/hooks/context/authStore";
import { useProductLineStore } from "@/hooks/context/productLineStore";

export const UseItemInfoUserPanel = () => {
  const { companies } = useProductLineStore();

  const drawerItemInfoForUserPanel = useMemo(() => {
    const staticItems = {
      داشبورد: { text: "داشبورد", icon: "Dashboard", to: "/dashboard" },
    };

    const dynamicProductLines = companies.reduce((acc, company) => {
      company.product_lines.forEach((line) => {
        acc[line.name] = {
          text: line.name,
          icon: line.icon || "DefaultIcon",
          to: `/dashboard/${line.name.replace(/\s/g, "").toLowerCase()}`,
        };
      });
      return acc;
    }, {} as Record<string, { text: string; icon: string; to: string }>);

    return {
      ...staticItems,
      ...dynamicProductLines,
    };
  }, [companies]);

  const footerItemInfoForUserPanel = useMemo(
    () => ({
      تنظیمات: {
        text: "تنظیمات",
        icon: "Settings",
        to: "/dashboard/settings",
        onClick: () => {},
      },
      خروج: {
        text: "خروج",
        icon: "Logout",
        to: "/login",
        onClick: () => deleteUser(),
      },
    }),
    []
  );

  return { drawerItemInfoForUserPanel, footerItemInfoForUserPanel };
};
