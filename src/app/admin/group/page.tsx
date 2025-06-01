"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewGroup } from "./hooks/useCreate";
import AllContentGroup from "./AllContent";
import { useGroupExtraOptions } from "./hooks/useGroupExtraOptions";

export default function GroupPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { permissionOptions, userOptions } = useGroupExtraOptions();

  const handleCreateGroup = async (data: unknown) => {
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
            required: true,
          },
          {
            name: "permissions",
            label: "دسترسی ها",
            type: "multiselect",
            required: true,
            options: permissionOptions,
          },
          {
            name: "users",
            label: "کاربران",
            type: "multiselect",
            required: false,
            options: userOptions,
          },
        ]}
        onSubmit={handleCreateGroup}
      />
      <AllContentGroup key={refreshKey} />
    </MainCard>
  );
}