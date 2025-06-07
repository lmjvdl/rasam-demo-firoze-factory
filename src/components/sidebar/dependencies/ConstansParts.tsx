export type DrawerItem = {
  text: string;
  icon: string;
  to: string;
  requiredPermissions?: number[];
  onClick?: () => void;
};

export const staticDrawerItems: Record<string, DrawerItem> = {
  داشبورد: {
    text: "داشبورد",
    icon: "Dashboard",
    to: "/dashboard",
  },
  "چینش تهیه بدنه": {
    text: "چینش تهیه بدنه",
    icon: "LayoutBodyPrep",
    to: "/dashboard/layout/bodyPrep",
  },
};

export const staticFooterItems: Record<string, DrawerItem> = {
  خروج: {
    text: "خروج",
    icon: "Logout",
    to: "/login",
    onClick: () => {},
  },
};
