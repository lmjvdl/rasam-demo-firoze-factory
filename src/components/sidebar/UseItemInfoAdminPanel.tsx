import { useMemo } from "react";
import { deleteUser } from "@/hooks/context/authStore";

export const UseItemInfoAdminPanel = () => {
  const drawerItemInfoForAdminPanel = useMemo(
    () => ({
      کاربر: { text: "کاربر", icon: "User", to: "/admin/user" },
      شرکت: { text: "شرکت", icon: "Company", to: "/admin/company" },
      گروه: { text: "گروه", icon: "Group", to: "/admin/group" },
      "نوع اطلاعات": {
        text: "نوع اطلاعات",
        icon: "DataType",
        to: "/admin/dataType",
      },
      "آپلود عکس": {
        text: "آپلود عکس",
        icon: "UploadImage",
        to: "/admin/uploadImage",
      },
      "دستگاه ها": { text: "دستگاه ها", icon: "Devices", to: "/admin/devices" },
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
      مخاطبین: {text: "مخاطبین", icon: "Contacts", to: "/admin/contacts"},
      "عملگر": { text: "عملگر", icon: "Operation", to: "/admin/operation" },
      دسترسی: { text: "دسترسی", icon: "Permission", to: "/admin/permission" },
      "تاریخچه پیامک ها": {
        text: "تاریخچه پیامک ها",
        icon: "SmsLog",
        to: "/admin/smsLog"
      },
      گزارش: { text: "گزارش", icon: "Report", to: "/admin/report" },
      زیربازه: { text: "زیربازه", icon: "Interval", to: "/admin/interval" },
      "ورودی گزارشات": { text: "ورودی گزارشات", icon: "InputItem", to: "/admin/inputItem" },
      "خروجی گزارشات": { text: "خروجی گزارشات", icon: "OutputItem", to: "/admin/outputItem" },
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
