"use client";

import ModalForm from "@/components/AdminPanelComponent/AddingProcess/ModalForm";
import MainCard from "@/components/CustomContiner/MainCard";
import { createNewDevice } from "./hooks/useCreate";
import AllContentDevice from "./AllContent";
import useProductLinePartQuery from "./hooks/useProducLinePartList";

export default function DevicePage() {

  const getListProductLinePart = useProductLinePartQuery();

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن دستگاه جدید"
        formFields={[
          {
            name: "product_line_part",
            label: "خط تولید جزیی",
            type: "select",
            required: true,
            options: getListProductLinePart.data.map((product_line_part) => ({
              label: product_line_part.name,
              value: product_line_part.id,
            })),
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
