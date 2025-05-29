"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewProductLinePart } from "./hooks/useCreate";
import AllContentProductLinePart from "./AllContent";
import useIcons from "@/hooks/reactQueryApiHooks/useIcon";
import { useProductLinePartExtraOptions } from "./hooks/useProductLinePartExtraOptions";

export default function ProductLinePartPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { icons, loading } = useIcons();
  const { productLineOptions, liveTypeOptions } = useProductLinePartExtraOptions();

  const handleCreateProductLinePart = async (data: unknown) => {
    const response = await createNewProductLinePart(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن خط تولید جزیی جدید"
        formFields={[
          {
            name: "product_line",
            label: "خط تولید",
            type: "select",
            required: true,
            options: productLineOptions,
          },
          {
            name: "live_type",
            label: "نوع داده لایو",
            type: "select",
            required: true,
            options: liveTypeOptions,
          },
          {
            name: "name",
            label: "نام",
            type: "text",
            required: true,
          },
          {
            name: "code",
            label: "کد",
            type: "text",
            required: true,
          },
          {
            name: "LightIcon",
            label: "آیکون تم لایت",
            type: "icon",
            required: false,
          },
          {
            name: "DarkIcon",
            label: "آیکون تم دارک",
            type: "icon",
            required: false,
          },
        ]}
        onSubmit={handleCreateProductLinePart}
        loadingIcons={loading}
        icons={icons}
      />
      <AllContentProductLinePart key={refreshKey} />
    </MainCard>
  );
}