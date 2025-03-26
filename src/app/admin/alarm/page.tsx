"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewAlarm } from "./hooks/useCreate";
import AllContentAlarm from "./AllContent";
import useFunctionQuery from "./hooks/useFunctionList";
import useDataTypeQuery from "./hooks/useDataTypeList";
import useDeviceQuery from "./hooks/useDeviceList";


export default function AlarmPage() {
  const getFunctionList  = useFunctionQuery();
  const getDataTypeList  = useDataTypeQuery();
  const getDeviceList    = useDeviceQuery();

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
            name: "description",
            label: "توضیحات",
            type: "text",
            required: false,
          },
          {
            name: "function",
            label: "تابع",
            type: "select",
            required: false,
            options: getFunctionList.data.map((func) => ({
              label: func.name,
              value: func.id,
            })),
          },
          {
            name: "device",
            label: "دستگاه",
            type: "select",
            required: false,
            options: getDeviceList.data.map((device) => ({
              label: device.name,
              value: device.id,
            })),
          },
          {
            name: "type",
            label: "نوع",
            type: "select",
            required: false,
            options: getDataTypeList.data.map((dataType) => ({
              label: dataType.name,
              value: dataType.id,
            })),
          },
        ]}
        onSubmit={createNewAlarm}
      />
      <AllContentAlarm />
    </MainCard>
  );
}
