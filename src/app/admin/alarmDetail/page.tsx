"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewAlarmDetail } from "./hooks/useCreate";
import AllContentAlarmDetail from "./AllContent";
import useAlarmQuery from "./hooks/useAlarmList";
import useParameterQuery from "./hooks/useParameterList";

export default function AlarmDetailPage() {
  const getAlarmList = useAlarmQuery();
  const getParameterList = useParameterQuery();
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن جزئیات هشدار جدید"
        formFields={[
          {
            name: "alarm",
            label: "هشدار",
            type: "select",
            required: false,
            options: getAlarmList.data.map((alarm) => ({
              label: alarm.name,
              value: alarm.id,
            })),
          },
          {
            name: "parameter",
            label: "پارامتر",
            type: "select",
            required: true,
            options: getParameterList.data.map((parameter) => ({
              label: parameter.name,
              value: parameter.id,
            })),
          },
          {
            name: "value",
            label: "مقدار",
            type: "number",
            required: true,
          },
        ]}
        onSubmit={createNewAlarmDetail}
      />
      <AllContentAlarmDetail />
    </MainCard>
  );
}
