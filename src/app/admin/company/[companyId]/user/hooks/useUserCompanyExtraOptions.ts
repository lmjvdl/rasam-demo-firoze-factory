import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import permissionUrls from "@/utils/url/adminPanel/permissionUrl";
import userUrls from "@/utils/url/adminPanel/userUrl";
import groupUrls from "@/utils/url/adminPanel/groupUrl";

export const useUserCompanyExtraOptions = () => {
  const userList = useDataQuery(
    allQueryKeys.adminPanel.userCompany.user_list,
    userUrls.listUser
  ).data?.map((user) => ({
    id: user.id,
    value: user.id,
    label: user.username || "",
  })) ?? [];

  const groupList = useDataQuery(
    allQueryKeys.adminPanel.userCompany.group_list,
    groupUrls.listGroup
  ).data?.map((group) => ({
    id: group.id,
    value: group.id,
    label: group.name,
  })) ?? [];

  const permissionList = useDataQuery(
    allQueryKeys.adminPanel.userCompany.permission_list,
    permissionUrls.listPermission
  ).data?.map((permission) => ({
    id: permission.id,
    value: permission.id,
    label: permission.name,
  })) ?? [];

  const userOptions = userList.map(({ label, value }) => ({
    label,
    value,
  }));

  const groupOptions = groupList.map(({ label, value }) => ({
    label,
    value,
  }));

  const permissionOptions = permissionList.map(({ label, value }) => ({
    label,
    value,
  }));

  return {
    userList,
    groupList,
    permissionList,
    userOptions,
    groupOptions,
    permissionOptions,
  };
};