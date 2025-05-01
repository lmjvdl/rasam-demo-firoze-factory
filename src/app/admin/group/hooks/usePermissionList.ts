import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import permissionUrls from "@/utils/url/adminPanel/permission/permission";
import { initialData } from "@/utils/refinedData/adminPanel/initialData/initialData";
import { listSanitizer } from "@/utils/refinedData/adminPanel/listSanitizer";


export default function usePermissionQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.group.permission_list,
    initialData: initialData,
    select: listSanitizer,
    queryFn: ({ signal }) => fetchWithError(permissionUrls.listPermission, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}