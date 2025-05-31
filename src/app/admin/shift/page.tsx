"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewShift } from "./hooks/useCreate";
import AllContentShift from "./AllContent";
import { useShiftExtraOptions } from "./hooks/useShiftExtraOptions";

export default function ShiftPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { companyOptions } = useShiftExtraOptions();

  const handleCreateShift = async (data: unknown) => {
    const response = await createNewShift(data);
    if (response.success) {
      setRefreshKey((prev) => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن شیفت جدید"
        formFields={[
          {
            name: "name",
            label: "نام شیفت",
            type: "text",
            required: true,
          },
          {
            name: "company",
            label: "شرکت",
            type: "select",
            required: true,
            options: companyOptions,
          },
          {
            name: "start_date",
            label: "تاریخ شروع",
            type: "date",
            required: true,
            placeholder: "تاریخ شروع",
          },
          {
            name: "end_date",
            label: "تاریخ پایان",
            type: "date",
            required: true,
            placeholder: "تاریخ پایان",
          },
          {
            name: "start_time",
            label: "ساعت شروع",
            type: "time",
            required: true,
            placeholder: "ساعت شروع",
          },
          {
            name: "end_time",
            label: "ساعت پایان",
            placeholder: "ساعت پایان",
            type: "time",
            required: true,
          },
        ]}
        onSubmit={handleCreateShift}
      />
      <AllContentShift key={refreshKey} />
    </MainCard>
  );
}