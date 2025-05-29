"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewAlarmDetail } from "./hooks/useCreate";
import AllContentAlarmDetail from "./AllContent";
import { useAlarmDetailExtraOptions } from "./hooks/useAlarmDetailExtraOptions";

export default function AlarmDetailPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { alarmOptions, parameterOptions } = useAlarmDetailExtraOptions();

  const handleCreateAlarmDetail = async (data: unknown) => {
    const response = await createNewAlarmDetail(data);
    if (response.success) {
      setRefreshKey((prev) => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن جزئیات هشدار جدید"
        formFields={[
          {
            name: "alarm",
            label: "هشدار",
            type: "select",
            required: true,
            options: alarmOptions,
          },
          {
            name: "parameter",
            label: "پارامتر",
            type: "select",
            required: true,
            options: parameterOptions,
          },
          {
            name: "value",
            label: "مقدار",
            type: "number",
            required: true,
          },
        ]}
        onSubmit={handleCreateAlarmDetail}
      />
      <AllContentAlarmDetail key={refreshKey} />
    </MainCard>
  );
}