"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewDataType } from "./hooks/useCreate";
import AllContentDataType from "./AllContent";

export default function DataTypePage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateDataType = async (data: any) => {
    const response = await createNewDataType(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن نوع اطلاعات جدید"
        formFields={[
          {
            name: "name",
            label: "نام",
            type: "text",
            required: true
          },
          {
            name: "json_field",
            label: "Json field",
            type: "text",
            required: true
          },
          {
            name: "description",
            label: "توضیحات",
            type: "text",
            required: false
          },
        ]}
        onSubmit={handleCreateDataType}
      />
      <AllContentDataType key={refreshKey} />
    </MainCard>
  );
}