"use client";

import { useState } from "react";
import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import AllContentUser from "./AllContent";
import { createNewUser } from "./hooks/useCreate";

export default function UserPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateUser = async (data: any) => {
    const response = await createNewUser(data);
    if (response.success) {
      setRefreshKey(prev => prev + 1);
      return { success: true };
    }
    return response;
  };

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن کاربر جدید"
        formFields={[
          {
            name: "username",
            label: "نام کاربری",
            type: "text",
            required: true
          },
          {
            name: "email",
            label: "ایمیل",
            type: "email",
            required: false
          },
          {
            name: "phone_number",
            label: "شماره تلفن",
            type: "tel",
            required: true
          },
          {
            name: "first_name",
            label: "نام",
            type: "text",
            required: false
          },
          {
            name: "last_name",
            label: "نام خانوادگی",
            type: "text",
            required: false
          },
          {
            name: "password",
            label: "رمز عبور",
            type: "password",
            required: true
          },
          {
            name: "national_code",
            label: "کد ملی",
            type: "text",
            required: true
          },
        ]}
        onSubmit={handleCreateUser}
      />
      <AllContentUser key={refreshKey} />
    </MainCard>
  );
}