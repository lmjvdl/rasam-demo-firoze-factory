import { useMemo } from "react";
import { signOut } from "next-auth/react";

export const UseItemInfoUserPanel = () => {
  const drawerItemInfoForUserPanel = useMemo(
    () => ({
      داشبورد: { text: "داشبورد", icon: "Dashboard", to: "/dashboard" },
      "بسته بندی": {
        text: "بسته بندی",
        icon: "Packaging",
        to: "/packaging/live",
      },
      "تهیه بدنه": {
        text: "تهیه بدنه",
        icon: "BodyPrep",
        to: "/preparing-body/live",
      },
      "تابلو برق": {
        text: "تابلو برق",
        icon: "PowerSupply",
        to: "/power-supply/live",
      },
      چمفر: { text: "چمفر", icon: "Chamfer", to: "/chamfer/live" },
    }),
    []
  );

  const footerItemInfoForUserPanel = useMemo(
    () => ({
      تنظیمات: {
        text: "تنظیمات",
        icon: "Settings",
        to: "/settings",
        onClick: () => {},
      },
      خروج: {
        text: "خروج",
        icon: "Logout",
        to: "/login",
        onClick: () => signOut(),
      },
    }),
    []
  );

  return { drawerItemInfoForUserPanel, footerItemInfoForUserPanel };
};
