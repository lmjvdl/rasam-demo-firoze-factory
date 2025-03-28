"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import AllContentContacts from "./AllContent";
import { createNewContact } from "./hooks/useCreate";


export default function ContactsPage() {
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
        onSubmit={createNewContact}
      />
      <AllContentContacts />
    </MainCard>
  );
}
