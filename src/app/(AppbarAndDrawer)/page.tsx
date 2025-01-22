"use client"

import MainCard from "@/components/CustomContiner/MainCard";
import BasicTabs from "@/components/Tabs/tabs";
import HomePage from "./power-supply/page";


export default function Home() {
  return (
    <MainCard>
        {/* <BasicTabs></BasicTabs> */}
        <HomePage></HomePage>
    </MainCard>
  );
}
