import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import contactsUrls from "@/utils/url/adminPanel/contactUrl";
import dataTypeUrls from "@/utils/url/adminPanel/dataTypeUrl";
import deviceUrls from "@/utils/url/adminPanel/deviceUrl";
import functionUrls from "@/utils/url/adminPanel/functionUrl";

export const useAlarmExtraOptions = () => {
  const functionData = useDataQuery(
    allQueryKeys.adminPanel.alarm.function_list,
    functionUrls.listFunction
  );

  const deviceData = useDataQuery(
    allQueryKeys.adminPanel.alarm.device_list,
    deviceUrls.listDevice
  );

  const dataTypeData = useDataQuery(
    allQueryKeys.adminPanel.alarm.data_type_list,
    dataTypeUrls.listDataType
  );

  const contactsData = useDataQuery(
    allQueryKeys.adminPanel.alarm.contacts_list,
    contactsUrls.listContacts
  );

  const functionList = functionData.data?.map((func) => ({
    id: func.id,
    value: func.id,
    label: func.name,
  })) ?? [];

  const deviceList = deviceData.data?.map((device) => ({
    id: device.id,
    value: device.id,
    label: device.name,
  })) ?? [];

  const dataTypeList = dataTypeData.data?.map((dataType) => ({
    id: dataType.id,
    value: dataType.id,
    label: dataType.name,
  })) ?? [];

  const contactsList = contactsData.data?.map((contact) => ({
    id: contact.id,
    value: contact.id,
    label: contact.name,
  })) ?? [];

  return {
    functionList,
    deviceList,
    dataTypeList,
    contactsList,
  };
};
