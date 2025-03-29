"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import AllContentCompany from "./AllContent";
import { createNewCompany } from "./hooks/useCreate";
import useIcons from "@/hooks/reactQueryApiHooks/useIcon";

export default function CompanyPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { icons, loading } = useIcons();

  const handleCreateCompany = async (data: any) => {
    const response = await createNewCompany(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
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
            required: true 
          },
          { 
            name: "description", 
            label: "توضیحات", 
            type: "text", 
            required: false 
          },
          { 
            name: "code", 
            label: "کد", 
            type: "text", 
            required: true 
          },
          { 
            name: "logo", 
            label: "لوگو", 
            type: "icon", 
            required: false 
          },
        ]}
        onSubmit={handleCreateCompany}
        icons={icons}
        loadingIcons={loading}
      />
      <AllContentCompany key={refreshKey} />
    </MainCard>
  );
}