"use client";

import ModalForm from "@/components/AdminPanelComponent/AddingProcess/ModalForm";
import MainCard from "@/components/CustomContiner/MainCard";
import AllContentCompany from "./AllContent";
import { createNewCompany } from "./useCreate";

export default function CompanyPage() {
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن شرکت جدید"
        formFields={[
            { name: "name", label: "نام شرکت", type: "text", required: true },
            { name: "description", label: "توضیحات", type: "text", required: false },
            { name: "code", label: "کد", type: "text", required: true },
            { name: "logo", label: "لوگو", type: "text", required: false },
          ]}
          onSubmit={createNewCompany}
      />
      <AllContentCompany />
    </MainCard>
  );
}