"use client";

import MainCard from "@/components/customContiner/MainCard";
import React, { useEffect, useMemo, useState } from "react";
import TabsSection from "@/components/tabs/TabsSection";
import { useSearchParams, useRouter } from "next/navigation";
import { reports } from "@/components/fakeData/live/reportBodyPrepDetailTest";
import BodyPrepLivePage from "../../components/bodyPrep/BodyPrepLive";
import { tabs } from "./tabsConfig";

export default function BodyPrepPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabIndexFromUrl = useMemo(() => {
    const deviceParam = searchParams.get("device");
    const index = tabs.findIndex((tab) => tab.name === deviceParam);
    return index !== -1 ? index : 0;
  }, [searchParams]);

  const [selectedTab, setSelectedTab] = useState(tabIndexFromUrl);

  useEffect(() => {
    setSelectedTab(tabIndexFromUrl);
  }, [tabIndexFromUrl]);

  const handleTabChange = (newIndex: number) => {
    const newDevice = tabs[newIndex].name;
    setSelectedTab(newIndex);
    router.push(`/bodyPrep?device=${newDevice}`);
  };

  const handleReportChange = (input: string) => {
    console.log("Selected report:", input);
  };

  const safeSelectedTab = Math.min(selectedTab, tabs.length - 1);
  const selectedTabName = tabs[safeSelectedTab].name;

  const currentReports =
    reports
      .find((r) => r.report_id === selectedTabName)
      ?.data.map((item) => item.name) || [];

  return (
    <MainCard>
      <TabsSection
        selectedTab={safeSelectedTab}
        reportOptions={{ [safeSelectedTab]: currentReports }}
        onTabChange={handleTabChange}
        tabLabels={tabs.map((tab) => tab.label)}
        onReportChange={handleReportChange}
      >
        <BodyPrepLivePage key={selectedTabName} />
      </TabsSection>
    </MainCard>
  );
}