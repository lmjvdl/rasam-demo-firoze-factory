"use client";

import ModalForm from "@/components/AdminPanelComponent/AddingProcess/ModalForm";
import MainCard from "@/components/CustomContiner/MainCard";
import { createNewDevice } from "./hooks/useCreate";
import AllContentDevice from "./AllContent";

export default function DevicePage() {
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن دستگاه جدید"
        formFields={[
          {
            name: "product_line_part", label: "بخش خط تولید", type: "number", required: true
          },
          {
            name: "name", label: "نام", type: "text", required: true
          },
          {
            name: "code", label: "کد", type: "text", required: true
          },
        ]}
        onSubmit={createNewDevice}
      />
      <AllContentDevice />
    </MainCard>
  );
}
