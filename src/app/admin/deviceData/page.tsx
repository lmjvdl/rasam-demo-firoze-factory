"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewDeviceData } from "./hooks/useCreate";
import AllContentDeviceData from "./AllContent";

export default function DeviceDataPage() {
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن اطلاعات دستگاه جدید"
        formFields={[
          {
            name: "device", label: "دستگاه", type: "number", required: true
          },
          {
            name: "data_type", label: "نوع داده", type: "number", required: true
          },
        ]}
        onSubmit={createNewDeviceData}
      />
      <AllContentDeviceData />
    </MainCard>
  );
}
