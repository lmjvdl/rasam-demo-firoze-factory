"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewFunctionParameter } from "./hooks/useCreate";
import AllContentFunctionParameter from "./AllContent";
import { useFunctionParameterExtraOptions } from "./hooks/useFunctionParameterExtraOptions";

export default function FunctionParameterPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { functionOptions } = useFunctionParameterExtraOptions();

  const handleCreateFunctionParameter = async (data: unknown) => {
    const response = await createNewFunctionParameter(data);
    if (response.success) {
      setRefreshKey((prev) => prev + 1);
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
            required: true,
          },
          {
            name: "function",
            label: "تابع",
            type: "select",
            required: true,
            options: functionOptions,
          },
        ]}
        onSubmit={handleCreateFunctionParameter}
      />
      <AllContentFunctionParameter key={refreshKey} />
    </MainCard>
  );
}