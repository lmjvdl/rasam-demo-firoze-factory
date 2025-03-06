"use client";

import ModalForm from "@/components/AdminPanelComponent/AddingProcess/ModalForm";
import MainCard from "@/components/CustomContiner/MainCard";
import { createNewDeviceData } from "./hooks/useCreate";
import AllContentDeviceData from "./AllContent";

export default function DeviceDataPage() {
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن اطلاعات دستگاه جدید"
        formFields={[
          {
            name: "device", label: "Device", type: "number", required: true
          },
          {
            name: "data_type", label: "Data Type", type: "number", required: true
          },
        ]}
        onSubmit={createNewDeviceData}
      />
      <AllContentDeviceData />
    </MainCard>
  );
}
