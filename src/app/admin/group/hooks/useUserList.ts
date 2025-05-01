import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import userUrls from "@/utils/url/adminPanel/user/userUrl";
import { initialData } from "@/utils/refinedData/adminPanel/initialData/initialData";
import { listSanitizer } from "@/utils/refinedData/adminPanel/listSanitizer";


export default function useUserQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.group.user_list,
    initialData: initialData,
    select: listSanitizer,
    queryFn: ({ signal }) => fetchWithError(userUrls.listUser, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}