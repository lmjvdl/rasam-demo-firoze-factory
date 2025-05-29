"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewOutputItem } from "../outputItem/hooks/useCreate";
import AllContentOutputItem from "../outputItem/AllContent";
import { useState } from "react";

export default function OutputItemPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateOutputItem = async (data: unknown) => {
    const response = await createNewOutputItem(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن آیتم خروجی جدید"
        formFields={[
          {
            name: "name", label: "نام", type: "text", required: true
          },
        ]}
        onSubmit={handleCreateOutputItem}
      />
      <AllContentOutputItem key={refreshKey}/>
    </MainCard>
  );
}
