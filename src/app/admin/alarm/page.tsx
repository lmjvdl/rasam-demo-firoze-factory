"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewAlarm } from "./hooks/useCreate";
import AllContentAlarm from "./AllContent";
import useFunctionQuery from "./hooks/useFunctionList";
import useDataTypeQuery from "./hooks/useDataTypeList";
import useDeviceQuery from "./hooks/useDeviceList";
import { useState } from "react";

export default function AlarmPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const getFunctionList = useFunctionQuery();
  const getDataTypeList = useDataTypeQuery();
  const getDeviceList = useDeviceQuery();

  const handleCreateAlarm = async (data: any) => {
    const response = await createNewAlarm(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن هشدار جدید"
        formFields={[
          {
            name: "name",
            label: "نام",
            type: "text",
            required: true,
          },
          {
            name: "function",
            label: "تابع",
            type: "select",
            required: true,
            options: getFunctionList.data?.map((func) => ({
              label: func.name,
              value: func.id,
            })) || [],
          },
          {
            name: "device",
            label: "دستگاه",
            type: "select",
            required: true,
            options: getDeviceList.data?.map((device) => ({
              label: device.name,
              value: device.id,
            })) || [],
          },
          {
            name: "type",
            label: "نوع",
            type: "select",
            required: true,
            options: getDataTypeList.data?.map((dataType) => ({
              label: dataType.name,
              value: dataType.id,
            })) || [],
          },
          {
            name: "description",
            label: "توضیحات",
            type: "text",
            required: false,
          },
        ]}
        onSubmit={handleCreateAlarm}
      />
      <AllContentAlarm key={refreshKey} />
    </MainCard>
  );
}