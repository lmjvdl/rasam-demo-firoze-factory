"use client";

import ModalForm from "@/components/AdminPanelComponent/AddingProcess/ModalForm";
import MainCard from "@/components/CustomContiner/MainCard";
import { createNewDataType } from "./hooks/useCreate";

export default function DataTypePage() {
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن DataType جدید"
        formFields={[
          {
            name: "name", label: "Name", type: "text", required: true
          },
          {
            name: "json_field", label: "Json field", type: "text", required: true
          },
          {
            name: "description", label: "Description", type: "text", required: false
          },
        ]}
        onSubmit={createNewDataType}
      />
      <AllContentDataType />
    </MainCard>
  );
}
