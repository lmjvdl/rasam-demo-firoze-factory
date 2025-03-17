"use client";

import { useState } from "react";
import TabsSection from "../../../components/dynamicSubcategory/TabsSection";
import BallMills from "./baalmill/live/page";
import FanSpray from "./fanSpray/live/page";


export default function PreparingBodyPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabLabels = ["بالمیل‌ها", "فن اسپری"];
  const reportOptions = {
    0: ["گزارش بالمیل ۱", "گزارش بالمیل ۲", "گزارش بالمیل ۳"],
    1: ["گزارش فن اسپری ۱", "گزارش فن اسپری ۲"],
  };

  const handleReportChange = (report: string) => {
    console.log("Selected Report: ", report);
  };

  return (
    <>
      <TabsSection
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabLabels={tabLabels}
        reportOptions={reportOptions}
        onReportChange={handleReportChange}
      >
        {selectedTab === 0 && <BallMills />}
        {selectedTab === 1 && <FanSpray />}
      </TabsSection>
    </>
  );
}
