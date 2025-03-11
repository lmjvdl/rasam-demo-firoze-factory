"use client";

import ModalForm from "@/components/AdminPanelComponent/AddingProcess/ModalForm";
import MainCard from "@/components/CustomContiner/MainCard";
import { createNewGroup } from "./hooks/useCreate";
import AllContentGroup from "./AllContent";
import usePermissionQuery from "./hooks/usePermissionList";
import useUserQuery from "./hooks/useUserList";

export default function GroupPage() {
  const getPermissionList = usePermissionQuery();
  const getUserList = useUserQuery();
  return (
    <MainCard> 
      <ModalForm
        buttonText="افزودن گروه جدید"
        formFields={[
          {
            name: "name", label: "نام", type: "text", required: true
          },
          {
            name: "permissions",
            label: "دسترسی ها",
            type: "multiselect",
            required: true,
            options: getPermissionList.data.map((permission) => ({
              label: permission.translate,
              value: permission.id,
            })),
          },
          {
            name: "users",
            label: "کاربران",
            type: "multiselect",
            required: false,
            options: getUserList.data.map((user) => ({
              label: user.username,
              value: user.id,
            })),
          },
        ]}
        onSubmit={createNewGroup}
      />
      <AllContentGroup />
    </MainCard>
  );
}
