import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "../../../../../../utils/dataFetching/allQueryKeys";
import fetchWithError from "../../../../../../utils/dataFetching/fetchWithError";
import productLineUrls from "../../../../../../utils/url/adminPanel/userUrl";
import { initialData } from "@/utils/refinedData/adminPanel/initialData/initialData";
import { listSanitizer } from "@/utils/refinedData/adminPanel/listSanitizer";


export default function useUserQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.userCompany.user_list,
    initialData: initialData,
    select: listSanitizer,
    queryFn: ({ signal }) => fetchWithError(productLineUrls.listUser, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}