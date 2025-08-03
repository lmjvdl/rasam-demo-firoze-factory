"use client";

import React, { useEffect, useState } from "react";
import MainCard from "@/components/customContiner/MainCard";
import { demoData } from "@/components/fakeData/layout/fakeData";
import LiveCardManager from "@/components/liveCards/LiveCardManager";
import { Box } from "@mui/material";
import startRandomGenerator from "@/utils/homeless/randomGenerator";
import { LiveValues } from "@/interfaces/lives/liveConfig";
import { useSearchParams } from "next/navigation";
import { Device } from "@/interfaces/user/layout/layoutBodyPrep";

export default function BodyPrepLivePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("device") || "BatchBaalMill";

  const filteredDevices = demoData.devices.filter((device) => device.type === name);
  const [liveValues, setLiveValues] = useState<LiveValues>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const stops: (() => void)[] = [];

    filteredDevices.forEach((device: Device) => {
      if (device.status === "blue" && device.defaultParams) {
        const deviceId = device.id;
        const paramKeys = Object.keys(device.defaultParams);

        paramKeys.forEach((key) => {
          const rawDefault = device.defaultParams?.[key];
          const numericDefault =
            typeof rawDefault === "string"
              ? parseFloat(rawDefault.replace(/[^\d.-]/g, ""))
              : typeof rawDefault === "number"
                ? rawDefault
                : 0;

          const [min, max] = [numericDefault - 10, numericDefault + 10];
          const unit =
            typeof rawDefault === "string"
              ? rawDefault.replace(/[\d.\-]/g, "")
              : "";

          const stop = startRandomGenerator(min, max, unit, (val) => {
            setLiveValues((prev) => ({
              ...prev,
              [deviceId]: {
                ...(prev[deviceId] || {}),
                [key]: parseFloat(val),
              },
            }));
          });

          stops.push(stop);
        });
      }
    });

    return () => {
      stops.forEach((stop) => stop());
    };
  }, [filteredDevices, isMounted]);

  if (!isMounted) return null;

  return (
    <MainCard>
      <Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          }}
        >
          {filteredDevices.map((device, index) => {
            const liveData = liveValues[device.id] || {};
            const defaultParams = device.defaultParams || {};

            const dataEntries = Object.keys(defaultParams).reduce((acc, key) => {
              const liveVal = (liveData as Record<string, number | undefined>)[key];
              const defaultVal = defaultParams[key];

              const defaultValNumber =
                typeof defaultVal === "string"
                  ? parseFloat(defaultVal.replace(/[^\d.]/g, "") || "0")
                  : typeof defaultVal === "number"
                    ? defaultVal
                    : 0;

              acc[key] =
                device.status === "blue"
                  ? liveVal ?? defaultValNumber
                  : device.status === "red"
                    ? 0
                    : undefined;

              return acc;
            }, {} as Record<string, number | undefined>);

            return (
              <LiveCardManager
                key={device.id}
                type={"multiSensor"}
                data={{
                  container: {
                    device: index + 1,
                    device_code: device.name || "unknown",
                    product_line_part: 1,
                    time: Date.now(),
                    online:
                      device.status === "blue"
                        ? "on"
                        : device.status === "grey"
                          ? "unknown"
                          : "off",
                    data: dataEntries,
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>
    </MainCard>
  );
}
