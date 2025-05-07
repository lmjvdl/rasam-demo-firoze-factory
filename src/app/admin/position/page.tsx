"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewPosition } from "../position/hooks/useCreate";
import AllContentPosition from "../position/AllContent";


export default function PositionPage() {
    const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateDataType = async (data: any) => {
    const response = await createNewPosition(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن سمت جدید"
        formFields={[
          {
            name: "name", label: "نام", type: "text", required: true
          },
        ]}
        onSubmit={handleCreateDataType}
      />
      <AllContentPosition key={refreshKey}/>
    </MainCard>
  );
}

