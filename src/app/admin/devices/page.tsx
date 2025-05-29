"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewDevice } from "./hooks/useCreate";
import AllContentDevice from "./AllContent";
import { useDeviceExtraOptions } from "./hooks/useDeviceExtraOptions";

export default function DevicePage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { productLinePartOptions, dataTypeOptions } = useDeviceExtraOptions();

  const handleCreateDevice = async (data: unknown) => {
    const response = await createNewDevice(data);
    if (response.success) {
      setRefreshKey((prev) => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن دستگاه جدید"
        formFields={[
          {
            name: "name",
            label: "نام",
            type: "text",
            required: true,
          },
          {
            name: "code",
            label: "کد",
            type: "text",
            required: true,
          },
          {
            name: "product_line_part",
            label: "خط تولید جزئی",
            type: "select",
            required: true,
            options: productLinePartOptions,
          },
          {
            name: "data_type",
            label: "نوع داده",
            type: "multiselect",
            required: true,
            options: dataTypeOptions,
          },
          {
            name: "on_off_identifier",
            label: "مشخص کننده خاموشی",
            type: "select",
            required: true,
            options: dataTypeOptions,
          },
          {
            name: "value",
            label: "مقدار مشخص کننده خاموشی",
            type: "number",
            required: true,
          },
        ]}
        onSubmit={handleCreateDevice}
      />
      <AllContentDevice key={refreshKey} />
    </MainCard>
  );
}