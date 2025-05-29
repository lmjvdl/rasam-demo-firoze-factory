"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewAlarm } from "./hooks/useCreate";
import AllContentAlarm from "./AllContent";
import { useAlarmExtraOptions } from "./hooks/useAlarmExtraOptions";

export default function AlarmPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const { functionOptions, deviceOptions, dataTypeOptions, contactsOptions } =
    useAlarmExtraOptions();

  const handleCreateAlarm = async (data: unknown) => {
    const response = await createNewAlarm(data);
    if (response.success) {
      setRefreshKey((prev) => prev + 1);
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
            options: functionOptions
          },
          {
            name: "device",
            label: "دستگاه",
            type: "select",
            required: true,
            options: deviceOptions
          },
          {
            name: "type",
            label: "نوع",
            type: "select",
            required: true,
            options: dataTypeOptions
          },
          {
            name: "receiver",
            label: "دریافت کننده",
            type: "select",
            required: true,
            options: contactsOptions
          },
          {
            name: "message_type",
            label: "نوع پیغام",
            type: "select",
            required: true,
            options: [
              { label: "sms", value: "sms" },
              { label: "email", value: "email" },
            ],
          },
          {
            name: "message",
            label: "متن پیغام",
            type: "text",
            required: true,
          },
          {
            name: "description",
            label: "توضیحات",
            type: "text",
            required: true,
          },
        ]}
        onSubmit={handleCreateAlarm}
      />
      <AllContentAlarm key={refreshKey} />
    </MainCard>
  );
}
