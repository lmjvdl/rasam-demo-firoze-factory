import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import deviceUrls from "@/utils/url/adminPanel/deviceUrl";

export const useDownloadFileExtraOptions = () => {
  const deviceData = useDataQuery(
    allQueryKeys.adminPanel.alarm.device_list,
    deviceUrls.listDevice
  );

  const deviceList = deviceData.data?.map((device) => ({
    id: device.id,
    value: device.id,
    label: device.name,
  })) ?? [];

  const deviceOptions = deviceList.map(({ label, value }) => ({
    label,
    value,
  }));

  return {
    deviceList,
    deviceOptions,
  };
};