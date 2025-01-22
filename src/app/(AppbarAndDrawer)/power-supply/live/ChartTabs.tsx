"use client";
import { Tabs, Tab, Box, Grid } from "@mui/material";
import MajorChart from "@/components/Chart/ChartConfig/MajorChart";
import React from "react";
import MainCard from "@/components/CustomContiner/MainCard";

interface DeviceData {
  device_name_fa: string;
  allowed_data: { [key: string]: string };
  data: { [key: string]: number }[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const ChartTabs: React.FC<{ data: DeviceData[] }> = ({ data }) => {
  const [value, setValue] = React.useState<number>(0);
  const tabs = Object.keys(data[0].allowed_data);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MainCard sx={{ gap: 2, flexDirection: "column" }}>
      <Tabs value={value} onChange={handleChange} aria-label="chart tabs">
        {tabs.map((tab, index) => (
          <Tab
            key={tab}
            label={data[0].allowed_data[tab]}
            id={`tab-${index}`}
          />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={tab} value={value} index={index}>
          <Grid container spacing={8}>
            {data.map((device: DeviceData) => (
              <Grid key={device.device_name_fa} item xs={12} sm={6} md={4}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h4>{device.device_name_fa}</h4>
                    <Box
                      sx={{
                        backgroundColor: "#0B8E7A",
                        paddingBlock: "2px",
                        paddingInline: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      {device.data.map((d) => d[tab])}
                    </Box>
                  </Box>
                  <MajorChart
                    type="line"
                    chartTitle={device.device_name_fa}
                    data={{
                      datasets: [
                        {
                          label: device.allowed_data[tab],
                          data: device.data.map((d) => d[tab]),
                          backgroundColor: ["#0B8E7A"],
                          borderColor: ["#0B8E7A"],
                          borderWidth: 1,
                          fill: true,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      scales: {
                        x: {
                          grid: {
                            display: false,
                          },
                        },
                        y: {
                          grid: {
                            display: false,
                          },
                        },
                      },
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      ))}
    </MainCard>
  );
};

export default ChartTabs;
