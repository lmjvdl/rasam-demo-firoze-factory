import { useMemo } from "react";
import { signOut } from "next-auth/react";

export const UseItemInfoUserPanel = () => {
  const drawerItemInfoForUserPanel = useMemo(
    () => ({
      داشبورد: { text: "داشبورد", icon: "Dashboard", to: "/dashboard" },
      "بسته بندی": {
        text: "بسته بندی",
        icon: "Packaging",
        to: "/dashboard/packaging",
      },
      "تهیه بدنه": {
        text: "تهیه بدنه",
        icon: "BodyPrep",
        to: "/dashboard/preparingBody",
      },
      "تابلو برق": {
        text: "تابلو برق",
        icon: "PowerSupply",
        to: "/dashboard/powerSupply",
      },
      چمفر: { text: "چمفر", icon: "Chamfer", to: "/chamfer" },
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
