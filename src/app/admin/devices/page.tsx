"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewDevice } from "./hooks/useCreate";
import AllContentDevice from "./AllContent";
import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import productLinePartUrls from "@/utils/url/adminPanel/productLinePartUrl";
import dataTypeUrls from "@/utils/url/adminPanel/dataTypeUrl";

export default function DevicePage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const getListProductLinePart = useDataQuery(
    allQueryKeys.adminPanel.devices.product_line_part_list,
    productLinePartUrls.listProductLinePart
  );
  const getListDataType = useDataQuery(
    allQueryKeys.adminPanel.devices.data_type_list,
    dataTypeUrls.listDataType
  );

  const handleCreateDevice = async (data: unknown) => {
    const response = await createNewDevice(data);
    if (response.success) {
      setRefreshKey((prev) => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن دستگاه جدید"
        formFields={[
          {
            name: "name",
            label: "نام",
            type: "text",
            required: true,
          },
          {
            name: "code",
            label: "کد",
            type: "text",
            required: true,
          },
          {
            name: "product_line_part",
            label: "خط تولید جزئی",
            type: "select",
            required: true,
            options:
              getListProductLinePart.data?.map((product_line_part) => ({
                label: product_line_part.name,
                value: product_line_part.id,
              })) || [],
          },
          {
            name: "data_type",
            label: "نوع داده",
            type: "multiselect",
            required: true,
            options:
              getListDataType.data?.map((data_type) => ({
                label: data_type.name,
                value: data_type.id,
              })) || [],
          },
          {
            name: "on_off_identifier",
            label: "مشخص کننده خاموشی",
            type: "select",
            required: true,
            options:
              getListDataType.data?.map((data_type) => ({
                label: data_type.name,
                value: data_type.id,
              })) || [],
          },
          {
            name: "value",
            label: "مقدار مشخص کننده خاموشی",
            type: "number",
            required: true,
          },
        ]}
        onSubmit={handleCreateDevice}
      />
      <AllContentDevice key={refreshKey} />
    </MainCard>
  );
}
