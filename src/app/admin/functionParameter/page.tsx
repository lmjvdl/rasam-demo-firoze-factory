"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewFunctionParameter } from "./hooks/useCreate";
import AllContentFunctionParameter from "./AllContent";
import useFunctionQuery from "./hooks/useFunctionList";

export default function FunctionParameterPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const getFunctionList = useFunctionQuery();

  const handleCreateFunctionParameter = async (data: unknown) => {
    const response = await createNewFunctionParameter(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن پارامتر تابع جدید"
        formFields={[
          {
            name: "name",
            label: "نام",
            type: "text",
            required: true
          },
          {
            name: "function",
            label: "تابع",
            type: "select",
            required: true,
            options: getFunctionList.data?.map((func) => ({
              label: func.name,
              value: func.id,
            })) || [],
          },
        ]}
        onSubmit={handleCreateFunctionParameter}
      />
      <AllContentFunctionParameter key={refreshKey} />
    </MainCard>
  );
}