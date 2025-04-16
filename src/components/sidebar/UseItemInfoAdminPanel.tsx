import { useMemo } from "react";
import { deleteUser } from "@/hooks/context/authStore";

export const UseItemInfoAdminPanel = () => {
  const drawerItemInfoForAdminPanel = useMemo(
    () => ({
      کاربر: { text: "کاربر", icon: "User", to: "/admin/user" },
      مخاطبین: {text: "مخاطبین", icon: "Contacts", to: "/admin/contacts"},
      گروه: { text: "گروه", icon: "Group", to: "/admin/group" },
      شرکت: { text: "شرکت", icon: "Company", to: "/admin/company" },
      "خط تولید": {
        text: "خط تولید",
        icon: "ProductLine",
        to: "/admin/productLine",
      },
      "خط تولید جزئی": {
        text: "خط تولید جزئی",
        icon: "ProductLinePart",
        to: "/admin/productLinePart",
      },
      "دستگاه ها": { text: "دستگاه ها", icon: "Devices", to: "/admin/devices" },
      "عملگر": { text: "عملگر", icon: "Operation", to: "/admin/operation" },
      "نوع اطلاعات": {
        text: "نوع اطلاعات",
        icon: "DataType",
        to: "/admin/dataType",
      },
      دسترسی: { text: "دسترسی", icon: "Permission", to: "/admin/permission" },
      "آپلود عکس": {
        text: "آپلود عکس",
        icon: "UploadImage",
        to: "/admin/uploadImage",
      },
      هشدار: {
        text: "هشدار",
        icon: "Alarm",
        to: "/admin/alarm",
      },
      "جزئیات هشدار": {
        text: "جزئیات هشدار",
        icon: "AlarmDetail",
        to: "/admin/alarmDetail"
      },
      تابع‌: {
        text: "تابع",
        icon: "Function",
        to: "/admin/function"
      },
      "پارامتر تابع": {
        text: "پارامتر تابع",
        icon: "FunctionParameter",
        to: "/admin/functionParameter"
      },
      "تاریخچه پیامک ها": {
        text: "تاریخچه پیامک ها",
        icon: "SmsLog",
        to: "/admin/smsLog"
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
