"use client";

import ModalForm from "@/components/AdminPanelComponent/AddingProcess/ModalForm";
import MainCard from "@/components/CustomContiner/MainCard";
import { createNewProductLinePart } from "./hooks/useCreate";
import AllContentProductLinePart from "./AllContent";

export default function ProductLinePartPage() {
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن خط تولید جزیی جدید"
        formFields={[
          {
            name: "product_line", label: "Product line", type: "number", required: true
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
        onSubmit={createNewProductLinePart}
      />
      <AllContentProductLinePart />
    </MainCard>
  );
}
