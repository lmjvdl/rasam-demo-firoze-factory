import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import permissionUrls from "@/utils/url/adminPanel/permissionUrl";
import groupUrls from "@/utils/url/adminPanel/groupUrl";

export const useContactsExtraOptions = () => {
  const permissionList = useDataQuery(
    allQueryKeys.adminPanel.contacts.permission_list,
    permissionUrls.listPermission
  ).data?.map((permission) => ({
    id: permission.id,
    value: permission.id,
    label: permission.translate,
  })) ?? [];

  const groupList = useDataQuery(
    allQueryKeys.adminPanel.contacts.group_list,
    groupUrls.listGroup
  ).data?.map((group) => ({
    id: group.id,
    value: group.id,
    label: group.name,
  })) ?? [];

  const permissionOptions = permissionList.map(({ label, value }) => ({
    label,
    value,
  }));

  const groupOptions = groupList.map(({ label, value }) => ({
    label,
    value,
  }));

  return {
    permissionList,
    groupList,
    permissionOptions,
    groupOptions,
  };
};