"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import AllContentOperation from "./AllContent";
import useDeviceQuery from "./hooks/useDeviceList";
import { createNewOperation } from "./hooks/useCreate";

export default function OperationPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const getDeviceList = useDeviceQuery();

  const handleCreateOperation = async (data: any) => {
    const response = await createNewOperation(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن عملیات جدید"
        formFields={[
          {
            name: "device",
            label: "دستگاه",
            type: "select",
            required: true,
            options: getDeviceList.data?.map((device) => ({
              label: device.name,
              value: device.id,
            })),
          },
          {
            name: "devices",
            label: "دستگاه ها",
            type: "multiselect",
            required: true,
            options: getDeviceList.data?.map((device) => ({
              label: device.name,
              value: device.id,
            })) || [],
          },
          {
            name: "operation",
            label: "عملگر",
            type: "select",
            required: true,
            options: [
              { label: "مجموع", value: "sum" },
              { label: "میانگین", value: "avg" },
            ],
          },
        ]}
        onSubmit={handleCreateOperation}
      />
      <AllContentOperation key={refreshKey} />
    </MainCard>
  );
}