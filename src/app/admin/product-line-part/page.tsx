"use client";

import ModalForm from "@/components/AdminPanelComponent/AddingProcess/ModalForm";
import MainCard from "@/components/CustomContiner/MainCard";
import { createNewProductLinePart } from "./hooks/useCreate";
import AllContentProductLinePart from "./AllContent";
import useIcons from "@/hooks/ReactQueryApiHooks/useIcon";

export default function ProductLinePartPage() {
  const { icons, loading } = useIcons();
  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن خط تولید جزیی جدید"
        formFields={[
          {
            name: "product_line", label: "خط تولید", type: "number", required: true
          },
          {
            name: "name", label: "نام", type: "text", required: true
          },
          {
            name: "code", label: "کد", type: "text", required: true
          },
          {
            name: "icon",
            label: "آیکون",
            type: "icon",
            required: false
          }
        ]}
        onSubmit={createNewProductLinePart}
        icons={icons} 
        loadingIcons={loading}
      />
      <AllContentProductLinePart />
    </MainCard>
  );
}
