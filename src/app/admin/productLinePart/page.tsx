"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewProductLinePart } from "./hooks/useCreate";
import AllContentProductLinePart from "./AllContent";
import useIcons from "@/hooks/reactQueryApiHooks/useIcon";
import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import productLineUrls from "@/utils/url/adminPanel/productLineUrl";

export default function ProductLinePartPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { icons, loading } = useIcons();
  const getListProductLine = useDataQuery(
    allQueryKeys.adminPanel.productLinePart.product_line_list,
    productLineUrls.listProductLine
  )

  const handleCreateProductLinePart = async (data: unknown) => {
    const response = await createNewProductLinePart(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن خط تولید جزئی جدید"
        formFields={[
          {
            name: "product_line_info",
            label: "خط تولید",
            type: "select",
            required: true,
            options: getListProductLine.data?.map((productLine) => ({
              label: productLine.name,
              value: productLine.id,
            })) || [],
          },
          {
            name: "name",
            label: "نام",
            type: "text",
            required: true
          },
          {
            name: "code",
            label: "کد",
            type: "text",
            required: true
          },
          {
            name: "icon",
            label: "آیکون",
            type: "icon",
            required: false
          }
        ]}
        onSubmit={handleCreateProductLinePart}
        icons={icons}
        loadingIcons={loading}
      />
      <AllContentProductLinePart key={refreshKey} />
    </MainCard>
  );
}