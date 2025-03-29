"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import AllContentContacts from "./AllContent";
import { createNewContact } from "./hooks/useCreate";
import { useState } from "react";

export default function ContactsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateContact = async (data: any) => {
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
            name: "name", label: "نام مخاطب", type: "text", required: true
          },
          {
            name: "phone_number", label: "شماره موبایل", type: "text", required: true
          },
        ]}
        onSubmit={handleCreateContact}
      />
      <AllContentContacts key={refreshKey} />
    </MainCard>
  );
}