"use client";

import { useState } from "react";
import AllContentFunction from "./AllContent";
import { createNewFunction } from "./hooks/useCreate";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";

export default function FunctionPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateFunction = async (data: unknown) => {
    const response = await createNewFunction(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن تابع جدید"
        formFields={[
          {
            name: "name",
            label: "نام",
            type: "text",
            required: true
          },
          {
            name: "description",
            label: "توضیحات",
            type: "text",
            required: true
          },
        ]}
        onSubmit={handleCreateFunction}
      />
      <AllContentFunction key={refreshKey} />
    </MainCard>
  );
}