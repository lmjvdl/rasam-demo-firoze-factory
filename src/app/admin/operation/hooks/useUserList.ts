import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import userUrls from "@/utils/url/adminPanel/user/userUrl";
import { userInitialData, userSanitizer } from "@/utils/refinedData/adminPanel/user";


export default function useUserQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.group.user_list,
    initialData: userInitialData,
    select: userSanitizer,
    queryFn: ({ signal }) => fetchWithError(userUrls.listUser, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}