"use client";

import ModalForm from "@/components/AdminPanelComponent/AddingProcess/ModalForm";
import MainCard from "@/components/CustomContiner/MainCard";

export default function AddUser() {
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن کاربر جدید"
        formFields={[
          { name: "username", label: "نام کاربری", type: "text", required: true },
          { name: "password", label: "رمز عبور", type: "password", required: true },
          { name: "firstName", label: "نام", type: "text", required: true },
          { name: "lastName", label: "نام خانوادگی", type: "text", required: true },
          { name: "phoneNumber", label: "شماره تلفن", type: "tel", required: true },
          { name: "email", label: "ایمیل", type: "email", required: true },
        ]}
        onSubmit={async (data) => {
          try {
            return { success: true };
          } catch (error) {
            return { success: false, error: "مشکلی پیش آمد" };
          }
        }}
      />
    </MainCard>
  );
}
