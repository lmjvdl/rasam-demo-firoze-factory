"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import AllContentUserCompany from "./AllContent";
import { createNewUserCompany } from "./hooks/useCreate";
import { use } from "react";
import { PageProps } from "@/interfaces/admin/userCompany";
import useUserQuery from "./hooks/useUserList";
import usePermissionQuery from "./hooks/usePermissionList";
import useGroupQuery from "./hooks/useGroupList";

export default function UserCompanyPage({ params }: PageProps) {
  const { companyId } = use(params);
  if (!companyId) return;
  const getUsersList = useUserQuery();
  const getPermissionsList = usePermissionQuery();
  const getGroupsList = useGroupQuery();
  
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن کاربر به شرکت"
        formFields={[
          { name: "company", label: "شرکت", type: "text", required: true },
          {
            name: "user",
            label: "کاربر",
            type: "select",
            required: true,
            options: getUsersList.data.map((user) => ({
              label: user.username,
              value: user.id,
            })),
          },
          {
            name: "groups",
            label: "گروه ها",
            type: "multiselect",
            required: false,
            options: getGroupsList.data.map((user) => ({
              label: user.name,
              value: user.id,
            })),
          },
          {
            name: "permissions",
            label: "دسترسی ها",
            type: "multiselect",
            required: false,
            options: getPermissionsList.data.map((permission) => ({
              label: permission.translate,
              value: permission.id,
            })),
          },
        ]}
        fixedValues={{ company: companyId }}
        onSubmit={createNewUserCompany}
      />
      <AllContentUserCompany companyId={Number(companyId)} />
    </MainCard>
  );
}
