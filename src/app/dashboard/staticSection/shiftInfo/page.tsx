"use client";

import MainCard from "@/components/customContiner/MainCard";
import TabsSection from "@/components/dynamicSubcategory/TabsSection";
import { usePermissions } from "@/hooks/context/usePermissions";
import { useState } from "react";
import ControlPage from "./control/page";
import NetPage from "./net/page";
import PlanningPage from "./planning/page";
import ProductionPage from "./production/page";

export default function ShiftInfoPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { hasAnyPermission } = usePermissions();

  const tabs = [
    { label: "کنترل", permissions: [203, 204, 205, 206, 327, 328, 329, 330] },
    { label: "نت", permissions: [207, 208, 209, 210, 327, 328, 329, 330] },
    {
      label: "برنامه ریزی",
      permissions: [199, 200, 201, 202, 327, 328, 329, 330],
    },
    { label: "تولید", permissions: [211, 212, 213, 214, 327, 328, 329, 330] },
  ];

  const allowedTabs = tabs.filter(
    (tab) => tab.permissions.length === 0 || hasAnyPermission(tab.permissions)
  );

  const safeSelectedTab = Math.min(selectedTab, allowedTabs.length - 1);

  return (
    <MainCard>
      <TabsSection
        selectedTab={safeSelectedTab}
        setSelectedTab={setSelectedTab}
        tabLabels={allowedTabs.map((tab) => tab.label)}
      >
        {allowedTabs[safeSelectedTab]?.label === "کنترل" && <ControlPage />}
        {allowedTabs[safeSelectedTab]?.label === "نت" && <NetPage />}
        {allowedTabs[safeSelectedTab]?.label === "برنامه ریزی" && <PlanningPage />}
        {allowedTabs[safeSelectedTab]?.label === "تولید" && (
          <ProductionPage />
        )}
      </TabsSection>
    </MainCard>
  );
}
