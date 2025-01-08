"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ReactNode, SyntheticEvent, useState } from "react";
import CreateUser from "./user/CreateUser";
import ApiKey from "./apikey/ApiKey";
import MainCard from "@/components/CustomContiner/MainCard";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(text: string) {
  return {
    id: text,
    "aria-controls": text,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MainCard sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="ایجاد کاربر جدید" {...a11yProps("0")} />
          <Tab label="ایجاد کلید دسترسی" {...a11yProps("1")} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CreateUser />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ApiKey />
      </CustomTabPanel>
    </MainCard>
  );
}
