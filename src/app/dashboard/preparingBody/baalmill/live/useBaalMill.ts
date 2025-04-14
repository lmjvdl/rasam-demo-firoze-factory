import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import InitLiveDataUrls from "@/utils/url/userPanel/live/initLive";
import { baalMillSanitizer, baalMillInitialDataQuery } from "@/utils/refinedData/userPanel/preparingBody/baalMill";

export default function useBaalMillQuery(productLinePart: number) {
  return useQuery({
    queryKey: allQueryKeys.userPanel.preparingBody.baalMill.live.liveData,
    initialData: baalMillInitialDataQuery,
    select: baalMillSanitizer,
    queryFn: ({ signal }) => fetchWithError(InitLiveDataUrls.initDataLive(productLinePart), { signal }),
    retry: false,
    refetchIntervalInBackground: true,
  });
}