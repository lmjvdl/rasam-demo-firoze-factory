 "use client";

import { useState } from "react";
import TabsSection from "../../../components/dynamicSubcategory/TabsSection";
import Chamfer from "./chamfer/live/page";



export default function ChamferPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabLabels = ["چمفر"];
  const reportOptions = {
    0: ["گزارش چمفر ۱", "گزارش چمفر ۲", "گزارش چمفر ۳"],
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
        {selectedTab === 0 && <Chamfer />}
      </TabsSection>
    </>
  );
}
