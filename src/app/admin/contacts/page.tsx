"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewContact } from "./hooks/useCreate";
import AllContentContacts from "./AllContent";
import { useContactsExtraOptions } from "./hooks/useContactsExtraOptions";

export default function ContactsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { permissionOptions, groupOptions } = useContactsExtraOptions();

  const handleCreateContact = async (data: unknown) => {
    const response = await createNewContact(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن مخاطب جدید"
        formFields={[
          {
            name: "name",
            label: "نام مخاطب",
            type: "text",
            required: true,
          },
          {
            name: "phone_number",
            label: "شماره تلفن",
            type: "text",
            required: true,
          },
          {
            name: "groups",
            label: "گروه ها",
            type: "multiselect",
            required: true,
            options: groupOptions,
          },
          {
            name: "user_permissions",
            label: "دسترسی های کاربر",
            type: "multiselect",
            required: true,
            options: permissionOptions,
          },
        ]}
        onSubmit={handleCreateContact}
      />
      <AllContentContacts key={refreshKey} />
    </MainCard>
  );
}