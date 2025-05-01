"use client";

import { useState } from "react";
import MainCard from "@/components/customContiner/MainCard";
import { createNewReport } from "./hooks/useCreate";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import AllContentReport from "./AllContent";

export default function ReportPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateReport = async (data: any) => {
    const response = await createNewReport(data);
    if (response.success) {
      setRefreshKey((prev) => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن گزارش جدید"
        formFields={[
          {
            name: "name",
            label: "نام",
            type: "text",
            required: true,
          },
          {
            name: "product_line_part",
            label: "بخش خط تولید",
            type: "select",
            required: false,
          },
          {
            name: "input_items",
            label: "آیتم های ورودی",
            type: "multiselect",
            required: false,
          },
          {
            name: "output_item",
            label: "آیتم خروجی",
            type: "select",
            required: false,
          },
          {
            name: "intervals",
            label: "بازه‌های زمانی",
            type: "multiselect",
            required: false,
          },
          {
            name: "api_func",
            label: "نام API تابع",
            type: "text",
            required: true,
          },
        ]}
        onSubmit={handleCreateReport}
      />
      <AllContentReport key={refreshKey} />
    </MainCard>
  );
}
