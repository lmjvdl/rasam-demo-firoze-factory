import { useQuery } from "@tanstack/react-query";
import { initialData } from "@/utils/refinedData/adminPanel/initialData/initialData";
import { listSanitizer } from "@/utils/refinedData/adminPanel/listSanitizer";
import fetchWithError from "@/utils/dataFetching/fetchWithError";


export default function useDataQuery(queryKey : readonly string[], url: URL) {
  return useQuery({
    queryKey: queryKey,
    initialData: initialData,
    select: listSanitizer,
    queryFn: ({ signal }) => fetchWithError(url, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}