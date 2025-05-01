import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import deviceUrls from "@/utils/url/adminPanel/device/deviceUrl";
import { initialData } from "@/utils/refinedData/adminPanel/initialData/initialData";
import { listSanitizer } from "@/utils/refinedData/adminPanel/listSanitizer";


export default function useDeviceQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.alarm.device_list,
    initialData: initialData,
    select: listSanitizer,
    queryFn: ({ signal }) => fetchWithError(deviceUrls.listDevice, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}