"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import AllContentUser from "./AllContent";
import { createNewUser } from "./hooks/useCreate";

export default function UserPage() {
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن کاربر جدید"
        formFields={[
          {
            name: "username", label: "نام کاربری", type: "text",
            required: true
          },
          {
            name: "email", label: "ایمیل", type: "email",
            required: false
          },
          {
            name: "phone_number", label: "شماره تلفن", type: "tel",
            required: true
          },
          {
            name: "firstName", label: "نام", type: "text",
            required: false
          },
          {
            name: "lastName", label: "نام خانوادگی", type: "text",
            required: false
          },
          {
            name: "password", label: "رمز عبور", type: "password",
            required: true
          },
          {
            name: "national_code", label: "کد ملی", type: "text",
            required: false
          },
        ]}
        onSubmit={createNewUser}
      />
      <AllContentUser />
    </MainCard>
  );
}