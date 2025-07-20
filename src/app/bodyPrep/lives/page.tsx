"use client";

import React from "react";
import MainCard from "@/components/customContiner/MainCard";
import { demoData } from "@/components/layoutDependencies/fakeData";
import { BodyPrepLiveProps } from "@/interfaces/user/general/productLinePart";
import LiveCardManager from "@/components/liveCards/LiveCardManager";

export default function BodyPrepLive({ name }: BodyPrepLiveProps) {
  const filteredDevices = demoData.devices.filter((device) => device.type === name);

  return (
    <MainCard>
      <div>
        <div
          style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {filteredDevices.map((device, index) => (
            <LiveCardManager
              key={device.id}
              type={"multiSensor" as const}
              data={{
                container: {
                  device: index + 1,
                  device_code: device.name || "Unknown",
                  product_line_part: 1,
                  time: Date.now(),
                  online:
                    device.status === "blue" ? "on" : "off",
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
        </div>
      </div>
    </MainCard>
  );
}
