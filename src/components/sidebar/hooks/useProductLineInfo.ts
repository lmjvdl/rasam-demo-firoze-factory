import { useMemo } from "react";
import { updateProductLines, useProductLineStore } from "@/hooks/context/productLineStore";
import { useAuthStore } from "@/hooks/context/authStore";

const iconMap: Record<string, string> = {
  "بسته‌بندی": "Packaging",
  "تهیه بدنه": "BodyPrep",
  "تابلو برق": "PowerSupply",
  "چمفر": "Chamfer",
};

export const useProductLineInfo = () => {
  const { companies } = useProductLineStore();
  const authResponse = useAuthStore();

  const drawerItemInfoForUserPanel = useMemo(() => {
    const items: Record<string, { text: string; icon: string; to: string }> = {};

    companies.forEach((company) => {
      company.product_lines.forEach((line) => {
        items[line.name] = {
          text: line.name,
          icon: iconMap[line.name] || "Dashboard",
          to: `/dashboard/${line.name.replace(/\s+/g, "").toLowerCase()}`,
        };
      });
    });

    return items;
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
        onClick: () => {
          const { deleteUser } = require("@/hooks/context/authStore");
          deleteUser();
        },
      },
    }),
    []
  );

  return { drawerItemInfoForUserPanel, footerItemInfoForUserPanel };
};
