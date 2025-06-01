"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewProductLine } from "./hooks/useCreate";
import AllContentProductLine from "./AllContent";
import useIcons from "@/hooks/reactQueryApiHooks/useIcon";
import { useProductLineExtraOptions } from "./hooks/useProductLineExtraOptions";

export default function ProductLinePage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { loading, icons } = useIcons();
  const { companyOptions } = useProductLineExtraOptions();


  const handleCreateProductLine = async (data: unknown) => {
    const response = await createNewProductLine(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن خط تولید جدید"
        formFields={[
          {
            name: "name",
            label: "نام",
            type: "text",
            required: true,
          },
          {
            name: "company_info",
            label: "شرکت",
            type: "select",
            required: true,
            options: companyOptions,
          },
          {
            name: "code",
            label: "کد",
            type: "text",
            required: true,
          },
          {
            name: "dark_icon",
            label: "آیکون تم دارک",
            type: "icon",
            required: false,
          },
          {
            name: "light_icon",
            label: "آیکون تم لایت",
            type: "icon",
            required: false,
          },
        ]}
        onSubmit={handleCreateProductLine}
        loadingIcons={loading}
        icons={icons}
      />
      <AllContentProductLine key={refreshKey} />
    </MainCard>
  );
}