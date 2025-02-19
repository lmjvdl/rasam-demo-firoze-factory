import { useMemo } from "react";
import { signOut } from "next-auth/react";

export const UseItemInfoAdminPanel = () => {
  const drawerItemInfoForAdminPanel = useMemo(
    () => ({
      کاربر: { text: "کاربر", icon: "User", to: "admin/user" },
      دسترسی: { text: "دسترسی", icon: "Permission", to: "admin/permission" },
      گروه: { text: "گروه", icon: "Group", to: "admin/group" },
      شرکت: { text: "شرکت", icon: "Company", to: "admin/company" },
      "خط تولید": { text: "خط تولید", icon: "ProductLine", to: "admin/product-line" },
      "خط تولید جزیی": { text: "خط تولید جزیی", icon: "ProductLinePart", to: "admin/product-line-part" },
      "دستگاه ها": { text: "دستگاه ها", icon: "Devices", to: "admin/devices" },
      "آپلود عکس": { text: "آپلود عکس", icon: "UploadImage", to: "admin/upload-image" },
    }),
    []
  );

  const footerItemInfoForAdminPanel = useMemo(
    () => ({
      خروج: {
        text: "خروج",
        icon: "Logout",
        to: "/login",
        onClick: () => signOut(),
      },
    }),
    []
  );

  return { drawerItemInfoForAdminPanel, footerItemInfoForAdminPanel };
};
