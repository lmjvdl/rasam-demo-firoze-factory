import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import deviceUrls from "@/utils/url/adminPanel/deviceUrl";
import dataTypeUrls from "@/utils/url/adminPanel/dataTypeUrl";

export const useOperationExtraOptions = () => {
  const deviceList = useDataQuery(
    allQueryKeys.adminPanel.operation.device_list,
    deviceUrls.listDevice
  ).data?.map((device) => ({
    id: device.id,
    value: device.id,
    label: device.name,
  })) ?? [];

  const dataTypeList = useDataQuery(
    allQueryKeys.adminPanel.operation.data_type_list,
    dataTypeUrls.listDataType
  ).data?.map((dataType) => ({
    id: dataType.id,
    value: dataType.id,
    label: dataType.name,
  })) ?? [];

  const deviceOptions = deviceList.map(({ label, value }) => ({
    label,
    value,
  }));

  const dataTypeMap = new Map(
    dataTypeList.map((item) => [item.id, item.label])
  );

  return {
    deviceList,
    dataTypeList,
    deviceOptions,
    dataTypeMap,
  };
};