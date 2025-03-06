"use client";

import ModalForm from "@/components/AdminPanelComponent/AddingProcess/ModalForm";
import MainCard from "@/components/CustomContiner/MainCard";
import { createNewGroup } from "./hooks/useCreate";
import AllContentGroup from "./AllContent";

export default function GroupPage() {
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن گروه جدید"
        formFields={[
          {
            name: "name", label: "Name", type: "text", required: true
          },
          {
            name: "permissions", label: "Permissions", type: "number", required: true
          },
          {
            name: "users", label: "Users", type: "text", required: false
          },
        ]}
        onSubmit={createNewGroup}
      />
      <AllContentGroup />
    </MainCard>
  );
}
