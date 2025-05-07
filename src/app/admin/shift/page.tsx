"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewShift } from "../shift/hooks/useCreate";
import AllContentShift from "../shift/AllContent";
import { useState } from "react";

export default function ShiftPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateShift = async (data: any) => {
    const response = await createNewShift(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن شیفت جدید"
        formFields={[
          {
            name: "name", label: "نام", type: "text", required: true
          },
        ]}
        onSubmit={handleCreateShift}
      />
      <AllContentShift key={refreshKey}/>
    </MainCard>
  );
}
