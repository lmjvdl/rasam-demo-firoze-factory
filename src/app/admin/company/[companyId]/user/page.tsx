"use client";

import { use, useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import AllContentUserCompany from "./AllContent";
import { createNewUserCompany } from "./hooks/useCreate";
import { PageProps } from "@/interfaces/admin/userCompany";
import { useUserCompanyExtraOptions } from "./hooks/useUserCompanyExtraOptions";

export default function UserCompanyPage({ params }: PageProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const { companyId } = use(params);
  const { userOptions, groupOptions, permissionOptions } = useUserCompanyExtraOptions();

  if (!companyId) return null;

  const handleCreateUserCompany = async (data: unknown) => {
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
            options: userOptions,
          },
          {
            name: "groups",
            label: "گروه ها",
            type: "multiselect",
            required: true,
            options: groupOptions,
          },
          {
            name: "permissions",
            label: "دسترسی ها",
            type: "multiselect",
            required: true,
            options: permissionOptions,
          },
        ]}
        fixedValues={{ company: companyId }}
        onSubmit={handleCreateUserCompany}
      />
      <AllContentUserCompany companyId={Number(companyId)} key={refreshKey} />
    </MainCard>
  );
}