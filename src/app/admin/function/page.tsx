"use client";

import AllContentFunction from "./AllContent";
import { createNewFunction } from "./hooks/useCreate";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";


export default function FunctionPage() {
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن تابع جدید"
        formFields={[
          {
            name: "name", label: "نام", type: "text", required: true
          },
          {
            name: "description", label: "توضیحات", type: "text", required: true
          },
        ]}
        onSubmit={createNewFunction}
      />
      <AllContentFunction />
    </MainCard>
  );
}
