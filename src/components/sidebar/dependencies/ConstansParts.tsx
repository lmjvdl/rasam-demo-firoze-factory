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
  "تکمیل اطلاعات شیفت": {
    text: "تکمیل اطلاعات شیفت",
    icon: "ShiftInformation",
    to: "/dashboard/staticSections/shiftInfo",
    // Must be delete 2, 3(for delete)
    requiredPermissions: [
      2, 3, 203, 204, 205, 206, 261, 262, 263, 264, 207, 208, 209, 210, 327, 328, 329,
      330, 199, 200, 201, 202, 211, 212, 213, 214, 215, 216, 217, 218,
    ],
  },
};

export const staticFooterItems: Record<string, DrawerItem> = {
  تنظیمات: {
    text: "تنظیمات",
    icon: "Settings",
    to: "/dashboard/staticSections/settings",
    requiredPermissions: [2],
  },
  خروج: {
    text: "خروج",
    icon: "Logout",
    to: "/login",
    onClick: () => {},
  },
};
