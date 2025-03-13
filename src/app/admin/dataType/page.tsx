"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewDataType } from "./hooks/useCreate";
import AllContentDataType from "./AllContent";

export default function DataTypePage() {
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن نوع اطلاعات جدید"
        formFields={[
          {
            name: "name", label: "نام", type: "text", required: true
          },
          {
            name: "json_field", label: "Json field", type: "text", required: true
          },
          {
            name: "description", label: "توضیحات", type: "text", required: false
          },
        ]}
        onSubmit={createNewDataType}
      />
      <AllContentDataType />
    </MainCard>
  );
}
