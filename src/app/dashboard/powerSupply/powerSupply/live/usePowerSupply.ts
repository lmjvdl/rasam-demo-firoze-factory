import { useQuery } from "@tanstack/react-query";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import initLiveDataUrls from "@/utils/url/userPanel/live/initLive";
import { powerSupplyInitialDataQuery, powerSupplySanitizer } from "@/utils/refinedData/userPanel/powerSupply/powerSupply";

export default function usePowerSupplyQuery(productLinePart: number) {
  return useQuery({
    queryKey: allQueryKeys.userPanel.powerSupply.powerSupply.live.liveData,
    initialData: powerSupplyInitialDataQuery,
    select: powerSupplySanitizer,
    queryFn: ({ signal }) =>
      fetchWithError(initLiveDataUrls.initDataLive(productLinePart), { signal }),
    refetchIntervalInBackground: true,
  });
}
