"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewShift } from "../shift/hooks/useCreate";
import AllContentShift from "../shift/AllContent";
import { useState } from "react";

export default function ShiftPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateShift = async (data: any) => {
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
            name: "start_date",
            label: "تاریخ شروع",
            type: "date",
            required: true,
          },
          {
            name: "start_time",
            label: "ساعت شروع",
            type: "text",
            required: true,
          },
          {
            name: "end_time",
            label: "ساعت پایان",
            type: "text",
            required: true,
          },
        ]}
        key={refreshKey}
        onSubmit={handleCreateShift}
      />

      <AllContentShift key={refreshKey} />
    </MainCard>
  );
}
