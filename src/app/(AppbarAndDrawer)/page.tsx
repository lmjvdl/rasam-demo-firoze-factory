"use client"

import MainCard from "@/components/CustomContiner/MainCard";
import SwitchThemeBtn from "@/components/SwitchModeTheme/SwitchThemeBtn";
import BasicTabs from "@/components/Tabs/tabs";
import { Typography } from "@mui/material";


export default function Home() {
  return (
    <MainCard>
      <SwitchThemeBtn/>
        <BasicTabs></BasicTabs>
    </MainCard>
  );
}
