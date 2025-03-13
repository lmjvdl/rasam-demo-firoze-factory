import { useMemo } from "react";
import { deleteUser } from "@/hooks/context/authStore";

export const UseItemInfoAdminPanel = () => {
  const drawerItemInfoForAdminPanel = useMemo(
    () => ({
      کاربر: { text: "کاربر", icon: "User", to: "/admin/user" },
      گروه: { text: "گروه", icon: "Group", to: "/admin/group" },
      شرکت: { text: "شرکت", icon: "Company", to: "/admin/company" },
      "خط تولید": {
        text: "خط تولید",
        icon: "ProductLine",
        to: "/admin/productLine",
      },
      "خط تولید جزیی": {
        text: "خط تولید جزیی",
        icon: "ProductLinePart",
        to: "/admin/productLinePart",
      },
      "دستگاه ها": { text: "دستگاه ها", icon: "Devices", to: "/admin/devices" },
      "اطلاعات دستگاه ها": {
        text: "اطلاعات دستگاه ها",
        icon: "DeviceType",
        to: "/admin/deviceData",
      },
      "نوع اطلاعات": {
        text: "نوع اطلاعات",
        icon: "DataType",
        to: "admin/dataType",
      },
      دسترسی: { text: "دسترسی", icon: "Permission", to: "admin/permission" },
      "آپلود عکس": {
        text: "آپلود عکس",
        icon: "UploadImage",
        to: "/admin/uploadImage",
      },
    }),
    []
  );

  const footerItemInfoForAdminPanel = useMemo(
    () => ({
      خروج: {
        text: "خروج",
        icon: "Logout",
        to: "/login",
        onClick: () => deleteUser(),
      },
    }),
    []
  );

  return { drawerItemInfoForAdminPanel, footerItemInfoForAdminPanel };
};
