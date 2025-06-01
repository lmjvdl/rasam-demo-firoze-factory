"use client";

import { useState } from "react";
import MainCard from "@/components/customContiner/MainCard";
import AllContentOperation from "./AllContent";
import CustomDeviceFormDialog from "@/components/adminPanelComponent/addingProcess/SpecialAggregateForm";
import { createFinalSubmit, createInitialSubmit } from "./hooks/useCreate";
import { useOperationExtraOptions } from "./hooks/useOperationExtraOptions";
import toast from "react-hot-toast";

export default function OperationPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { deviceOptions } = useOperationExtraOptions();

  return (
    <MainCard>
      <CustomDeviceFormDialog
        deviceOptions={deviceOptions}
        onInitialSubmit={async (device_ids) => {
          const response = await createInitialSubmit({
            device_ids
          });
          if (response.success && response.data.length > 0) {
            return response.data;
          } else if(response.data.length === 0){
            toast.error("هیچ نوع داده مشترکی یافت نشد.")
            return null;
          } else {
            toast.error("خطا در دریافت اطلاعات")
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
          if (response.success) {
            setRefreshKey(prev => prev + 1);
          } else {
            toast.error("خطا در ثبت نهایی")
          }
        }}
      />
      <AllContentOperation key={refreshKey} />
    </MainCard>
  );
}