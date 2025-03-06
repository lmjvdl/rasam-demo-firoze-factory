"use client";

import ModalForm from "@/components/AdminPanelComponent/AddingProcess/ModalForm";
import MainCard from "@/components/CustomContiner/MainCard";
import { createNewProductLine } from "./hooks/useCreate";
import AllContentProductLine from "./AllContent";

export default function ProductLinePage() {
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن خط تولید جدید"
        formFields={[
          {
            name: "company", label: "Company", type: "number", required: true
          },
          {
            name: "name", label: "Name", type: "text", required: true
          },
          {
            name: "code", label: "Code", type: "text", required: true
          },
          {
            name: "icon", label: "Icon", type: "number", required: false
          },
        ]}
        onSubmit={createNewProductLine}
      />
      <AllContentProductLine />
    </MainCard>
  );
}
