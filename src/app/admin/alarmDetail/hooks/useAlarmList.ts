import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import alarmUrls from "@/utils/url/adminPanel/alarm/alarmUrl";
import { alarmInitialData, alarmSanitizer } from "@/utils/refinedData/adminPanel/alarm";

export default function useAlarmQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.alarmDetail.alarm_list,
    initialData: alarmInitialData,
    select: alarmSanitizer,
    queryFn: ({ signal }) => fetchWithError(alarmUrls.listAlarm, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}