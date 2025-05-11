"use client";

import { useState } from "react";
import MainCard from "@/components/customContiner/MainCard";
import { createNewReport } from "./hooks/useCreate";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import AllContentReport from "./AllContent";
import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import inputItemsUrls from "@/utils/url/adminPanel/inputItemUrl";
import outputItemUrls from "@/utils/url/adminPanel/outputItemUrl";
import intervalUrls from "@/utils/url/adminPanel/intervalUrl";
import productLinePartUrls from "@/utils/url/adminPanel/productLinePartUrl";

export default function ReportPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const inputItemsList = useDataQuery(
    allQueryKeys.adminPanel.report.input_items_list,
    inputItemsUrls.listInputItem
  );

  const outputItemList = useDataQuery(
    allQueryKeys.adminPanel.report.output_items_list,
    outputItemUrls.listOutputItem
  );

  const intervalsList = useDataQuery(
    allQueryKeys.adminPanel.report.intervals_list,
    intervalUrls.listInterval
  );

  const productLinePartList = useDataQuery(
    allQueryKeys.adminPanel.report.product_line_part_list,
    productLinePartUrls.listProductLinePart
  );

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
            options:
            productLinePartList.data?.map((product_line_part) => ({
              label: product_line_part.name,
              value: product_line_part.id,
            })) || [],
          },
          {
            name: "input_items",
            label: "آیتم های ورودی",
            type: "multiselect",
            required: false,
            options:
            inputItemsList.data?.map((input) => ({
              label: input.name,
              value: input.id,
            })) || [],
          },
          {
            name: "output_item",
            label: "آیتم خروجی",
            type: "select",
            required: false,
            options:
              outputItemList.data?.map((output) => ({
                label: output.name,
                value: output.id,
              })) || [],
          },
          {
            name: "intervals",
            label: "بازه‌های زمانی",
            type: "multiselect",
            required: false,
            options:
              intervalsList.data?.map((inrterval) => ({
                label: inrterval.name,
                value: inrterval.id,
              })) || [],
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
