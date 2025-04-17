"use client";

import { useState } from "react";
import TabsSection from "@/components/dynamicSubcategory/TabsSection";
import PowerSupply from "./powerSupply/live/page";

const tabInfo = [
  { id: 10, name: "تابلو برق 1(تابلو 1)" },
  { id: 11, name: "تابلو برق 1(تابلو 2)" },
  { id: 12, name: "تابلو برق 1(تابلو 3)" },
  { id: 13, name: "تابلو برق 1(تابلو 4)" },
  { id: 14, name: "تابلو برق 1(تابلو 5)" },
  { id: 15, name: "تابلو برق 2(تابلو 1)" },
  { id: 16, name: "تابلو برق 3(تابلو 1)" },
];

export default function PowerSupplyPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleReportChange = (report: string) => {
    console.log("Selected Report: ", report);
  };
  const reportOptions = {
    0: ["گزارش چمفر ۱", "گزارش چمفر ۲", "گزارش چمفر ۳"],
  };
  
  return (
    <TabsSection
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      tabLabels={tabInfo.map((t) => t.name)}
      reportOptions={reportOptions}
      onReportChange={handleReportChange}

    >
      <PowerSupply productLinePartId={tabInfo[selectedTab].id} />
    </TabsSection>
  );
}
