"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewInterval } from "../interval/hooks/useCreate";
import AllContentInterval from "../interval/AllContent";
import { useState } from "react";

export default function IntervalPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateInterval = async (data: any) => {
    const response = await createNewInterval(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن بازه زمانی جدید"
        formFields={[
          {
            name: "name", label: "نام", type: "text", required: true
          },
          {
            name: "duration", label: "مدت زمان(به طور مثال 0 01:00:00)", type: "text", required: true
          },
        ]}
        onSubmit={handleCreateInterval}
      />
      <AllContentInterval key={refreshKey}/>
    </MainCard>
  );
}
