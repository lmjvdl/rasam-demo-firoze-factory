import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import companyUrls from "@/utils/URLs/adminPanel/company/companyUrl";
import { companyInitialData, companySanitizer } from "@/utils/refinedData/adminPanel/company";


export default function useCompanyQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.company.list,
    initialData: companyInitialData,
    select: companySanitizer,
    queryFn: ({ signal }) => fetchWithError(companyUrls.listCompany, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}