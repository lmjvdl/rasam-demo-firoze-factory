import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "../../../../../../utils/dataFetching/allQueryKeys";
import fetchWithError from "../../../../../../utils/dataFetching/fetchWithError";
import productLineUrls from "../../../../../../utils/url/adminPanel/user/userUrl";
import { userInitialData, userSanitizer } from "../../../../../../utils/refinedData/adminPanel/user";


export default function useUserQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.userCompany.user_list,
    initialData: userInitialData,
    select: userSanitizer,
    queryFn: ({ signal }) => fetchWithError(productLineUrls.listUser, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}