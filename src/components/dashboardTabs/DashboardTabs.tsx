"use client"; // 👈 این خط را اضافه کن

import { Tabs, Tab } from "@mui/material";
import { usePathname, useRouter } from "next/navigation"; // 👈 بجای useRouter از usePathname استفاده می‌کنیم
import { useEffect, useState } from "react";

const tabConfig: Record<string, string[]> = {
  packaging: ["fillInformation", "packaging"],
  preparingBody: ["fanSpray", "baalmill"],
  chamfer: ["chamfer"],
  powerSupply: ["poweSupply"],
};

const DashboardTabs = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const pathParts = pathname.split("/").filter(Boolean);
  const mainSection = pathParts[1] || "";
  const subSections = tabConfig[mainSection] || [];

  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    const currentTab = pathParts[2] || subSections[0];
    setSelectedTab(currentTab);
  }, [pathname, subSections]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    router.push(`/dashboard/${mainSection}/${newValue}`);
  };

  if (!subSections.length) return null;

  return (
    <Tabs value={selectedTab} onChange={handleChange}>
      {subSections.map((sub) => (
        <Tab key={sub} label={sub} value={sub} />
      ))}
    </Tabs>
  );
};

export default DashboardTabs;
