import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "../../../../../../utils/dataFetching/allQueryKeys";
import fetchWithError from "../../../../../../utils/dataFetching/fetchWithError";
import groupUrls from "../../../../../../utils/url/adminPanel/group/groupUrl";
import { listSanitizer } from "@/utils/refinedData/adminPanel/listSanitizer";
import { initialData } from "@/utils/refinedData/adminPanel/initialData/initialData";


export default function useGroupQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.userCompany.group_list,
    initialData: initialData,
    select: listSanitizer,
    queryFn: ({ signal }) => fetchWithError(groupUrls.listGroup, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}