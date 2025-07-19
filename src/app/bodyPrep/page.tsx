"use client";

import MainCard from "@/components/customContiner/MainCard";
import React, { useState } from "react";
import TabsSection from "@/components/tabs/TabsSection";
import BodyPrepLive from "./lives/page";

export default function BodyPrepPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (input: string) => {
    console.log(input);
  };

  const tabs = [
    { label: "بالمیل بچ", name: "BatchBaalMill", liveType: "multiSensor" },
    {
      label: "بالمیل کانتینیوس",
      name: "ContinuesBallMill",
      liveType: "multiSensor",
    },
    {
      label: "سیلوهای گرانول",
      name: "GranuleSillo",
      liveType: "multiSensor",
    },
    {
      label: "حوضچه دوغاب راست",
      name: "SlurryPitRight",
      liveType: "multiSensor",
    },
    { label: "حوضچه دوغاب چپ", name: "SlurryPitLeft", liveType: "multiSensor" },
    { label: "پمپ حوضچه", name: "SlurryPump", liveType: "multiSensor" },
    { label: "اسپری درایر", name: "SprayDryer", liveType: "multiSensor" },
    { label: "صفحه ویبره", name: "VibratingScreen", liveType: "multiSensor" },
  ];

  const safeSelectedTab = Math.min(selectedTab, tabs.length - 1);

  return (
    <MainCard>
      <TabsSection
        selectedTab={safeSelectedTab}
        setSelectedTab={setSelectedTab}
        tabLabels={tabs.map((tab) => tab.label)}
        onReportChange={handleChange}
      >
        <BodyPrepLive
          liveType={tabs[safeSelectedTab].liveType}
          label={tabs[safeSelectedTab].label}
          name={tabs[safeSelectedTab].name}
        />
      </TabsSection>
    </MainCard>
  );
}
