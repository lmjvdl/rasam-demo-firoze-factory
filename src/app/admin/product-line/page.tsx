"use client";

import ModalForm from "@/components/AdminPanelComponent/AddingProcess/ModalForm";
import MainCard from "@/components/CustomContiner/MainCard";
import { createNewProductLine } from "./hooks/useCreate";
import AllContentProductLine from "./AllContent";
import useIcons from "@/hooks/ReactQueryApiHooks/useIcon";
import useCompanyQuery from "./hooks/useCompanyList";

export default function ProductLinePage() {
  const { icons, loading } = useIcons();
  
  // Use effect to store company list data after fetching  
  const getListCompany = useCompanyQuery();

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن خط تولید جدید"
        formFields={[
          {
            name: "company",
            label: "شرکت",
            type: "select",
            required: true,
            options: getListCompany.data.map((company) => ({
              label: company.name,
              value: company.id,
            })),
          },
          {
            name: "name",
            label: "نام",
            type: "text",
            required: true,
          },
          {
            name: "code",
            label: "کد",
            type: "text",
            required: true,
          },
          {
            name: "icon",
            label: "آیکون",
            type: "icon",
            required: false,
          },
        ]}
        onSubmit={createNewProductLine}
        icons={icons}
        loadingIcons={loading}
      />
      <AllContentProductLine />
    </MainCard>
  );
}
