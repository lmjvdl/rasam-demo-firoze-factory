"use client";

import React from "react";
import MainCard from "@/components/customContiner/MainCard";
import { demoData } from "@/components/fakeData/layout/fakeData";
import { BodyPrepLiveProps } from "@/interfaces/user/general/productLinePart";
import LiveCardManager from "@/components/liveCards/LiveCardManager";
import { Box } from "@mui/material";

export default function BodyPrepLive({ name }: BodyPrepLiveProps) {
  const filteredDevices = demoData.devices.filter((device) => device.type === name);

  return (
    <MainCard>
      <Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          }}
        >
          {filteredDevices.map((device, index) => (
            <LiveCardManager
              key={device.id}
              type={"multiSensor" as const}
              data={{
                container: {
                  device: index + 1,
                  device_code: device.name || "unknown",
                  product_line_part: 1,
                  time: Date.now(),
                  online:
                    device.status === "blue" ? "on" : device.status === "grey" ? "unknown" : "off",
                  data: {
                    current: device.status === "blue"
                      ? parseFloat(device.current || "0")
                      : undefined,
                    temperature: device.status === "blue"
                      ? parseFloat(device.temprature || "0")
                      : undefined,
                  },
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </MainCard>
  );
}
