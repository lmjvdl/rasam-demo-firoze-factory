"use client";

import { useState } from "react";
import MainCard from "@/components/customContiner/MainCard";
import AllContentOperation from "./AllContent";
import CustomDeviceFormDialog from "@/components/adminPanelComponent/addingProcess/SpecialAggregateForm";
import { createFinalSubmit, createInitialSubmit } from "./hooks/useCreate";
import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import deviceUrls from "@/utils/url/adminPanel/deviceUrl";

export default function OperationPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const getDeviceList = useDataQuery(
    allQueryKeys.adminPanel.operation.device_list,
    deviceUrls.listDevice
  );

  const deviceOptions = getDeviceList.data?.map((device) => ({
    label: device.name,
    value: device.id,
  })) || [];

  return (
    <MainCard>
      <CustomDeviceFormDialog
        deviceOptions={deviceOptions}
        onInitialSubmit={async (device_ids) => {
          const response = await createInitialSubmit({
            device_ids
          });

          if (response.success) {
            return response.data;
          } else {
            console.error("خطا در ثبت اولیه:", response);
            return null;
          }
        }}
        onFinalSubmit={async (data) => {
          const payload = {
            ...data,
            datatype_operation: data.datatype_operation && Object.keys(data.datatype_operation).length > 0 
              ? data.datatype_operation 
              : null,
            devices: Array.isArray(data.devices) ? data.devices : [],
          };
          
          const response = await createFinalSubmit(payload);
          console.log(payload);
          if (response.success) {
            console.log("ثبت نهایی موفق:", response.data);
            setRefreshKey(prev => prev + 1);
          } else {
            console.error("خطا در ثبت نهایی:", response.error);
          }
        }}
      />

      <AllContentOperation key={refreshKey} />
    </MainCard>
  );
}