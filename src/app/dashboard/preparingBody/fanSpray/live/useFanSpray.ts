import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import InitLiveDataUrls from "@/utils/url/userPanel/live/initLive";
import { fanSpraySanitizer, fanSprayInitialDataQuery } from "@/utils/refinedData/userPanel/preparingBody/fanSpray";

export default function useFanSprayQuery(productLinePart: number) {
  return useQuery({
    queryKey: allQueryKeys.userPanel.preparingBody.fanSpray.live.liveData,
    initialData: fanSprayInitialDataQuery,
    select: fanSpraySanitizer,
    queryFn: ({ signal }) => fetchWithError(InitLiveDataUrls.initDataLive(productLinePart), { signal }),
    retry: false,
    refetchIntervalInBackground: true,
  });
}