"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewDevice } from "./hooks/useCreate";
import AllContentDevice from "./AllContent";
import useProductLinePartQuery from "./hooks/useProducLinePartList";
import useDataTypeQuery from "./hooks/useDataTypeList";

export default function DevicePage() {

  const getListProductLinePart = useProductLinePartQuery();
  const getListDataType = useDataTypeQuery();
  
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
            name: "data_type",
            label: "نوع داده",
            type: "multiselect",
            required: true,
            options: getListDataType.data.map((data_type) => ({
              label: data_type.name,
              value: data_type.id,
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
