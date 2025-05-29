"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { useState } from "react";
import { createNewLiveType } from "./hooks/useCreate";
import AllContentLiveTypes from "./AllContent";

export default function LiveTypesPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateLiveType = async (data: unknown) => {
    const response = await createNewLiveType(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن نوع لایو جدید"
        formFields={[
          {
            name: "name", label: "نام", type: "text", required: true
          },
        ]}
        onSubmit={handleCreateLiveType}
      />
      <AllContentLiveTypes key={refreshKey}/>
    </MainCard>
  );
}
