"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewInputItem } from "../inputItem/hooks/useCreate";
import AllContentInputItem from "../inputItem/AllContent";
import { useState } from "react";

export default function InputItemPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateInputItem = async (data: unknown) => {
    const response = await createNewInputItem(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن آیتم ورودی جدید"
        formFields={[
          {
            name: "name", label: "نام", type: "text", required: true
          },
        ]}
        onSubmit={handleCreateInputItem}
      />
      <AllContentInputItem key={refreshKey}/>
    </MainCard>
  );
}
