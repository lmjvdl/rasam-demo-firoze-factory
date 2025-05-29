import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import permissionUrls from "@/utils/url/adminPanel/permissionUrl";
import userUrls from "@/utils/url/adminPanel/userUrl";

export const useGroupExtraOptions = () => {
  const permissionList = useDataQuery(
    allQueryKeys.adminPanel.group.permission_list,
    permissionUrls.listPermission
  ).data?.map((permission) => ({
    id: permission.id,
    value: permission.id,
    label: permission.translate,
  })) ?? [];

  const userList = useDataQuery(
    allQueryKeys.adminPanel.group.user_list,
    userUrls.listUser
  ).data?.map((user) => ({
    id: user.id,
    value: user.id,
    label: user.username,
  })) ?? [];

  const permissionOptions = permissionList.map(({ label, value }) => ({
    label,
    value,
  }));

  const userOptions = userList.map(({ label, value }) => ({
    label,
    value,
  }));

  return {
    permissionList,
    userList,
    permissionOptions,
    userOptions,
  };
};