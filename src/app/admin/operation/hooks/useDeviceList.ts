import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import deviceUrls from "@/utils/url/adminPanel/device/deviceUrl";
import { deviceInitialData, deviceSanitizer } from "@/utils/refinedData/adminPanel/device";


export default function useDeviceQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.alarm.device_list,
    initialData: deviceInitialData,
    select: deviceSanitizer,
    queryFn: ({ signal }) => fetchWithError(deviceUrls.listDevice, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}