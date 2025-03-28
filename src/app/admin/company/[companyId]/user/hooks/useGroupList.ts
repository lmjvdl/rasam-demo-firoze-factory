import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "../../../../../../utils/dataFetching/allQueryKeys";
import fetchWithError from "../../../../../../utils/dataFetching/fetchWithError";
import groupUrls from "../../../../../../utils/url/adminPanel/group/groupUrl";
import { groupInitialData, groupSanitizer } from "../../../../../../utils/refinedData/adminPanel/group";


export default function useGroupQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.userCompany.group_list,
    initialData: groupInitialData,
    select: groupSanitizer,
    queryFn: ({ signal }) => fetchWithError(groupUrls.listGroup, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}