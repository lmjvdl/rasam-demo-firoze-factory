"use client";

import ModalForm from "@/components/AdminPanelComponent/ModalForm";
import MainCard from "@/components/CustomContiner/MainCard";

export default function UserPage() {
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن کاربر جدید"
        formFields={[
          { name: "username", label: "نام کاربری", type: "text" },
          { name: "email", label: "ایمیل", type: "email" },
          {
            name: "role",
            label: "نقش",
            type: "select",
            options: [
              { label: "مدیر", value: "admin" },
              { label: "کاربر", value: "user" },
            ],
          },
        ]}
        onSubmit={async (data) => {
          try {
            // ارسال اطلاعات به سرور
            return { success: true };
          } catch (error) {
            return { success: false, error: "مشکلی پیش آمد" };
          }
        }}
      />
    </MainCard>
  );
}
