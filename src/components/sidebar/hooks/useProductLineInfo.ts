import { useEffect, useMemo } from "react";
import ProductLineResponseSanitizer from "@/utils/contextDependencies/productLineResponseSanitizer";
import { updateProductLines, useProductLineStore } from "@/hooks/context/productLineStore";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import toast from "react-hot-toast";

const iconMap: Record<string, string> = {
  بسته‌بندی: "Packaging",
  "تهیه بدنه": "BodyPrep",
  "تابلو برق": "PowerSupply",
  چمفر: "Chamfer",
};

export const useProductLineInfo = () => {
  const productLineState = useProductLineStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawResponse = await fetchWithErrorWithAlarm("/api/product-line");
        const sanitized = ProductLineResponseSanitizer(rawResponse);
        updateProductLines(sanitized.data);
      } catch {
        toast.error("خطا در دریافت اطلاعات خط های تولید")
      }
    };

    if (productLineState.product_lines.length === 0) {
      fetchData();
    }
  }, []);

  const drawerItemInfoForUserPanel = useMemo(() => {
    const items: Record<string, { text: string; icon: string; to: string }> = {};

    productLineState.product_lines.forEach((line) => {
      items[line.name] = {
        text: line.name,
        icon: iconMap[line.name] || "Dashboard",
        to: `/dashboard/${line.name.replace(/\s+/g, "").toLowerCase()}`,
      };
    });

    return items;
  }, [productLineState.product_lines]);

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
