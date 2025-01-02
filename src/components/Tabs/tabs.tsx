"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ReportDropdown from "@/components/ReportDropdown/ReportDropdown";
import BarChart from "../BarChart";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    </>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            p: 2,
            bgcolor: "background.paper",
            borderRadius: 2,
            gridTemplateColumns: {
              xs: "1fr 3fr", // موبایل: باکس اول 25% و باکس دوم 75%
              md: "3fr 1fr", // دسکتاپ و تبلت: باکس اول 75% و باکس دوم 25%
            },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="بسته بندی" {...a11yProps(0)} />
              </Tabs>
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <ReportDropdown />
          </Box>
        </Box>
      </Box>
      <Box>
          <BarChart ></BarChart>
      </Box>
    </Box>
  );
}
