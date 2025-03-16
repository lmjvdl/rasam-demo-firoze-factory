"use client";

import { Tabs, Tab, Box } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import BallMills from "../BallMills";
import FanSpray from "../FanSpray";

export default function TabsSection({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: 0 | 1;
  setSelectedTab: Dispatch<SetStateAction<0 | 1>>;
}) {
  return (
    <Box width="100%">
      <Tabs
        value={selectedTab}
        onChange={(_, newValue) => setSelectedTab(newValue)}
        sx={{ marginBottom: "30px" }}
      >
        <Tab label="بالمیل‌ها" />
        <Tab label="فن اسپری" />
      </Tabs>

      <Box className="mt-4">
        {selectedTab === 0 && <BallMills />}
        {selectedTab === 1 && <FanSpray />}
      </Box>
    </Box>
  );
}
