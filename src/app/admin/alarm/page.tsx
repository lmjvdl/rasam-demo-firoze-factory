"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewAlarm } from "./hooks/useCreate";
import AllContentAlarm from "./AllContent";
import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import functionUrls from "@/utils/url/adminPanel/function/functionUrl";
import contactsUrls from "@/utils/url/adminPanel/contacts/contactUrls";
import dataTypeUrls from "@/utils/url/adminPanel/dataType/dataTypeUrl";
import deviceUrls from "@/utils/url/adminPanel/device/deviceUrl";

export default function AlarmPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const getFunctionList = useDataQuery(
    allQueryKeys.adminPanel.alarm.function_list,
    functionUrls.listFunction
  );
  const getDataTypeList = useDataQuery(
    allQueryKeys.adminPanel.alarm.data_type_list,
    dataTypeUrls.listDataType
  );
  const getDeviceList = useDataQuery(
    allQueryKeys.adminPanel.alarm.device_list,
    deviceUrls.listDevice
  );
  const getContactsList = useDataQuery(
    allQueryKeys.adminPanel.alarm.contacts_list,
    contactsUrls.listContacts
  );

  const handleCreateAlarm = async (data: any) => {
    const response = await createNewAlarm(data);
    if (response.success) {
      setRefreshKey((prev) => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن هشدار جدید"
        formFields={[
          {
            name: "name",
            label: "نام",
            type: "text",
            required: true,
          },
          {
            name: "function",
            label: "تابع",
            type: "select",
            required: true,
            options:
              getFunctionList.data?.map((func) => ({
                label: func.name,
                value: func.id,
              })) || [],
          },
          {
            name: "device",
            label: "دستگاه",
            type: "select",
            required: true,
            options:
              getDeviceList.data?.map((device) => ({
                label: device.name,
                value: device.id,
              })) || [],
          },
          {
            name: "type",
            label: "نوع",
            type: "select",
            required: true,
            options:
              getDataTypeList.data?.map((dataType) => ({
                label: dataType.name,
                value: dataType.id,
              })) || [],
          },
          {
            name: "receiver",
            label: "دریافت کننده",
            type: "select",
            required: true,
            options:
              getContactsList.data?.map((contact) => ({
                label: contact.name,
                value: contact.id,
              })) || [],
          },
          {
            name: "message_type",
            label: "نوع پیغام",
            type: "select",
            required: true,
            options: [
              { label: "sms", value: "sms" },
              { label: "email", value: "email" },
            ],
          },
          {
            name: "message",
            label: "متن پیغام",
            type: "text",
            required: true,
          },
          {
            name: "description",
            label: "توضیحات",
            type: "text",
            required: true,
          },
        ]}
        onSubmit={handleCreateAlarm}
      />
      <AllContentAlarm key={refreshKey} />
    </MainCard>
  );
}
