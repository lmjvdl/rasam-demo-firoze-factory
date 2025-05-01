import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import alarmUrls from "@/utils/url/adminPanel/alarm/alarmUrl";
import { initialData } from "@/utils/refinedData/adminPanel/initialData/initialData";
import { listSanitizer } from "@/utils/refinedData/adminPanel/listSanitizer";

export default function useAlarmQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.alarmDetail.alarm_list,
    initialData: initialData,
    select: listSanitizer,
    queryFn: ({ signal }) => fetchWithError(alarmUrls.listAlarm, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}