"use client";

import { use, useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import AllContentUserCompany from "./AllContent";
import { createNewUserCompany } from "./hooks/useCreate";
import { PageProps } from "@/interfaces/admin/userCompany";
import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import permissionUrls from "@/utils/url/adminPanel/permissionUrl";
import userUrls from "@/utils/url/adminPanel/userUrl";
import groupUrls from "@/utils/url/adminPanel/groupUrl";

export default function UserCompanyPage({ params }: PageProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const { companyId } = use(params);
  
  const getUsersList = useDataQuery(
    allQueryKeys.adminPanel.userCompany.user_list,
    userUrls.listUser
  );
  const getPermissionsList = useDataQuery(
    allQueryKeys.adminPanel.userCompany.permission_list,
    permissionUrls.listPermission
  );
  const getGroupsList = useDataQuery(
    allQueryKeys.adminPanel.userCompany.group_list,
    groupUrls.listGroup
  );

  if (!companyId) return null;

  const handleCreateUserCompany = async (data: any) => {
    const response = await createNewUserCompany(data);
    if (response.success) {
      setRefreshKey((prev) => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن کاربر به شرکت"
        formFields={[
          {
            name: "company",
            label: "شرکت",
            type: "text",
            required: true,
          },
          {
            name: "user",
            label: "کاربر",
            type: "select",
            required: true,
            options:
              getUsersList.data?.map((user) => ({
                label: user.username ? user.username : "",
                value: user.id,
              })) || [],
          },
          {
            name: "groups",
            label: "گروه ها",
            type: "multiselect",
            required: false,
            options:
              getGroupsList.data?.map((group) => ({
                label: group.name,
                value: group.id,
              })) || [],
          },
          {
            name: "permissions",
            label: "دسترسی ها",
            type: "multiselect",
            required: false,
            options:
              getPermissionsList.data?.map((permission) => ({
                label: permission.name,
                value: permission.id,
              })) || [],
          },
        ]}
        fixedValues={{ company: companyId }}
        onSubmit={handleCreateUserCompany}
      />
      <AllContentUserCompany companyId={Number(companyId)} key={refreshKey} />
    </MainCard>
  );
}
