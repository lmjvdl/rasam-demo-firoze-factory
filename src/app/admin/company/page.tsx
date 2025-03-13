"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import AllContentCompany from "./AllContent";
import { createNewCompany } from "./hooks/useCreate";
import useIcons from "@/hooks/reactQueryApiHooks/useIcon";

export default function CompanyPage() {
  const { icons, loading } = useIcons();
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن شرکت جدید"
        formFields={[
            { name: "name", label: "نام شرکت", type: "text", required: true },
            { name: "description", label: "توضیحات", type: "text", required: false },
            { name: "code", label: "کد", type: "text", required: true },
            { name: "logo", label: "لوگو", type: "icon", required: false },
          ]}
          onSubmit={createNewCompany}
          icons={icons}
          loadingIcons={loading}
      />
      <AllContentCompany />
    </MainCard>
  );
}