"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewAlarmDetail } from "./hooks/useCreate";
import AllContentAlarmDetail from "./AllContent";
import useAlarmQuery from "./hooks/useAlarmList";
import useParameterQuery from "./hooks/useParameterList";
import { useState } from "react";

export default function AlarmDetailPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const getAlarmList = useAlarmQuery();
  const getParameterList = useParameterQuery();

  const handleCreateAlarmDetail = async (data: any) => {
    const response = await createNewAlarmDetail(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
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
            options: getAlarmList.data?.map((alarm) => ({
              label: alarm.name,
              value: alarm.id,
            })) || [],
          },
          {
            name: "parameter",
            label: "پارامتر",
            type: "select",
            required: true,
            options: getParameterList.data?.map((parameter) => ({
              label: parameter.name,
              value: parameter.id,
            })) || [],
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