"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewFunctionParameter } from "./hooks/useCreate";
import AllContentFunctionParameter from "./AllContent";
import useFunctionQuery from "./hooks/useFunctionList";


export default function FunctionParameterPage() {
  const getFunctionList  = useFunctionQuery();

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن پارامتر تابع جدید"
        formFields={[
          {
            name: "name", label: "نام", type: "text", required: true
          },
          {
            name: "function",
            label: "تابع",
            type: "select",
            required: true,
            options: getFunctionList.data.map((func) => ({
              label: func.name,
              value: func.id,
            })),
          },
        ]}
        onSubmit={createNewFunctionParameter}
      />
      <AllContentFunctionParameter />
    </MainCard>
  );
}
