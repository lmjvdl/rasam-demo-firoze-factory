import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "../../../../../../utils/dataFetching/allQueryKeys";
import fetchWithError from "../../../../../../utils/dataFetching/fetchWithError";
import permissionUrls from "../../../../../../utils/url/adminPanel/permission/permission";
import { permissionInitialData, permissionSanitizer } from "../../../../../../utils/refinedData/adminPanel/permission";


export default function usePermissionQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.userCompany.permission_list,
    initialData: permissionInitialData,
    select: permissionSanitizer,
    queryFn: ({ signal }) => fetchWithError(permissionUrls.listPermission, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}