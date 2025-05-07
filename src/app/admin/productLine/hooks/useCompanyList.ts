import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import companyUrls from "@/utils/url/adminPanel/companyUrl";
import { initialData } from "@/utils/refinedData/adminPanel/initialData/initialData";
import { listSanitizer } from "@/utils/refinedData/adminPanel/listSanitizer";

export default function useCompanyQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.company.list,
    initialData: initialData,
    select: listSanitizer,
    queryFn: ({ signal }) => fetchWithError(companyUrls.listCompany, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}