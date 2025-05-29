"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewProductLine } from "./hooks/useCreate";
import AllContentProductLine from "./AllContent";
import useIcons from "@/hooks/reactQueryApiHooks/useIcon";
import useCompanyQuery from "./hooks/useCompanyList";

export default function ProductLinePage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { icons, loading } = useIcons();
  const getListCompany = useCompanyQuery();

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
            name: "company_info",
            label: "شرکت",
            type: "select",
            required: true,
            options: getListCompany.data?.map((company) => ({
              label: company.name,
              value: company.id,
            })) || [],
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
            name: "icon",
            label: "آیکون",
            type: "icon",
            required: false,
          },
        ]}
        onSubmit={handleCreateProductLine}
        icons={icons}
        loadingIcons={loading}
      />
      <AllContentProductLine key={refreshKey} />
    </MainCard>
  );
}