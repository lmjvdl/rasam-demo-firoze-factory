"use client";

import { useState } from "react";
import TabsSection from "../../../components/dynamicSubcategory/TabsSection";
import JsonReport from "./jsonReport/page";
import ExcleReport from "./excleReport/page";


export default function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabLabels = ["دانلود گزارش کلی به صورت JSON", "دانلود گزارش کلی به صورت excle"];


  const handleReportChange = (report: string) => {
    console.log("Selected Report: ", report);
  };

  return (
    <>
      <TabsSection
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabLabels={tabLabels}
        onReportChange={handleReportChange}
      >
        {selectedTab === 0 && <JsonReport />}
        {selectedTab === 1 && <ExcleReport />}
      </TabsSection>
    </>
  );
}
