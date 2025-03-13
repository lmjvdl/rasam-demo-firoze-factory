"use client";

import ModalForm from "@/components/adminPanelComponent/addingProcess/ModalForm";
import MainCard from "@/components/customContiner/MainCard";
import { createNewProductLinePart } from "./hooks/useCreate";
import AllContentProductLinePart from "./AllContent";
import useIcons from "@/hooks/reactQueryApiHooks/useIcon";
import useProductLineQuery from "./hooks/useProductLineList";

export default function ProductLinePartPage() {
  const { icons, loading } = useIcons();

  const getListProductLine = useProductLineQuery();

  return (
    <MainCard>
      <ModalForm
        buttonText="افزودن خط تولید جزیی جدید"
        formFields={[
          {
            name: "product_line",
            label: "خط تولید",
            type: "select",
            required: true,
            options: getListProductLine.data.map((product_line) => ({
              label: product_line.name,
              value: product_line.id,
            })),
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
