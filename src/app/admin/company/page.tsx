"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import AllContentCompany from "./AllContent";
import { createNewCompany } from "./hooks/useCreate";
import { useCompanyExtraOptions } from "./hooks/useCompanyExtraOptions";
import useIcons from "@/hooks/reactQueryApiHooks/useIcon";

export default function CompanyPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { iconOptions } = useCompanyExtraOptions();
  const { loading } = useIcons();

  const handleCreateCompany = async (data: unknown) => {
    const response = await createNewCompany(data);
    if (response.success) {
      setRefreshKey((prev) => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن شرکت جدید"
        formFields={[
          {
            name: "name",
            label: "نام شرکت",
            type: "text",
            required: true,
          },
          {
            name: "description",
            label: "توضیحات",
            type: "text",
            required: false,
          },
          {
            name: "code",
            label: "کد",
            type: "text",
            required: true,
          },
          {
            name: "light_logo",
            label: "لوگو تم لایت",
            type: "icon",
            required: true,
            options: iconOptions,
          },
          {
            name: "dark_logo",
            label: "لوگو تم دارک",
            type: "icon",
            required: true,
            options: iconOptions,
          },
        ]}
        onSubmit={handleCreateCompany}
        loadingIcons={loading}
      />
      <AllContentCompany key={refreshKey} />
    </MainCard>
  );
}