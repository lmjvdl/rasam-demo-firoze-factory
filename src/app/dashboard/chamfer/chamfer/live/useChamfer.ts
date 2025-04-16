import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import InitLiveDataUrls from "@/utils/url/userPanel/live/initLive";
import { chamferSanitizer, chamferInitialDataQuery } from "@/utils/refinedData/userPanel/chamfer/chamfer";

export default function useChamferQuery(productLinePart: number) {
  return useQuery({
    queryKey: allQueryKeys.userPanel.chamfer.chamfer.live.liveData,
    initialData: chamferInitialDataQuery,
    select: chamferSanitizer,
    queryFn: ({ signal }) => fetchWithError(InitLiveDataUrls.initDataLive(productLinePart), { signal }),
    retry: false,
    refetchIntervalInBackground: true,
  });
}