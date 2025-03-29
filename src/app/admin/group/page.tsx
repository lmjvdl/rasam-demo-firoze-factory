"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewGroup } from "./hooks/useCreate";
import AllContentGroup from "./AllContent";
import usePermissionQuery from "./hooks/usePermissionList";
import useUserQuery from "./hooks/useUserList";

export default function GroupPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const getPermissionList = usePermissionQuery();
  const getUserList = useUserQuery();

  const handleCreateGroup = async (data: any) => {
    const response = await createNewGroup(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن گروه جدید"
        formFields={[
          {
            name: "name",
            label: "نام",
            type: "text",
            required: true
          },
          {
            name: "permissions",
            label: "دسترسی ها",
            type: "multiselect",
            required: true,
            options: getPermissionList.data?.map((permission) => ({
              label: permission.translate,
              value: permission.id,
            })) || [],
          },
          {
            name: "users",
            label: "کاربران",
            type: "multiselect",
            required: false,
            options: getUserList.data?.map((user) => ({
              label: user.username,
              value: user.id,
            })) || [],
          },
        ]}
        onSubmit={handleCreateGroup}
      />
      <AllContentGroup key={refreshKey} />
    </MainCard>
  );
}