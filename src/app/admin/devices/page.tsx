"use client";

import ModalForm from "@/components/AdminPanelComponent/AddingProcess/ModalForm";
import MainCard from "@/components/CustomContiner/MainCard";
import { createNewDevice } from "./hooks/useCreate";

export default function DevicePage() {
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن Device جدید"
        formFields={[
          {
            name: "product_line_part", label: "Product line part", type: "number", required: true
          },
          {
            name: "name", label: "Name", type: "text", required: true
          },
          {
            name: "code", label: "Code", type: "text", required: true
          },
        ]}
        onSubmit={createNewDevice}
      />
      <AllContentDevice />
    </MainCard>
  );
}
