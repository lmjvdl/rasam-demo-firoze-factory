"use client";

import React, { useEffect, useRef, useState } from "react";
import MainCard from "@/components/customContiner/MainCard";
import { demoData } from "@/components/fakeData/layout/fakeData";
import LiveCardManager from "@/components/liveCards/LiveCardManager";
import { Box } from "@mui/material";
import startRandomGenerator from "@/utils/homeless/randomGenerator";
import { LiveValues } from "@/interfaces/lives/liveConfig";
import { useSearchParams } from "next/navigation";
import { Device } from "@/interfaces/user/layout/layoutBodyPrep";
import { secondsToTimeString, timeStringToSeconds } from "@/utils/formatters/liveTimer";

/**
 * Live page component displaying real-time data of devices filtered by type.
 * 
 * It:
 * - Reads the device type from the URL query parameter `device` (defaults to "BatchBaalMill").
 * - Filters devices based on the selected type from demo data.
 * - Maintains live time counters for each device and updates them every second.
 * - Generates live parameter values for devices with status "blue" by simulating random fluctuations.
 * - Passes live data and device info down to LiveCardManager components for rendering.
 *
 * This component uses React hooks for state and side effects, including:
 * - `useRef` for mutable live timers that persist without causing rerenders.
 * - `useEffect` for setting up intervals and live data generation with cleanup.
 *
 * @returns JSX element rendering the live devices inside a responsive grid layout.
 */
export default function BodyPrepLivePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("device") || "BatchBaalMill";

  // Filter devices by selected type
  const filteredDevices = demoData.devices.filter((device) => device.type === name);

  // Holds live parameter values per device
  const [liveValues, setLiveValues] = useState<LiveValues>({});

  // Dummy state to force re-render every second for live timer update
  const [, forceUpdate] = useState(0);

  // Ref to keep track of operating time in seconds for each device without triggering rerenders
  const liveTimesRef = useRef<Record<string, number>>({});

  // New state to hold the current timestamp for hydration-safe live time
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Initialize liveTimesRef for each device when filteredDevices changes
  useEffect(() => {
    filteredDevices.forEach((device) => {
      const deviceId = device.id;
      if (liveTimesRef.current[deviceId] === undefined) {
        // Use operatingTime or startTime from device or fallback to zero
        const timeStr = device.operatingTime || device.startTime || "00:00:00";
        liveTimesRef.current[deviceId] = timeStringToSeconds(timeStr);
      }
    });
  }, [filteredDevices]);

  // Increment live timers every second and update currentTime and force re-render
  useEffect(() => {
    const interval = setInterval(() => {
      Object.keys(liveTimesRef.current).forEach((deviceId) => {
        liveTimesRef.current[deviceId]++;
      });
      setCurrentTime(Date.now());
      forceUpdate((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // For devices with "blue" status, start random value generators for each default parameter
  useEffect(() => {
    const stops: (() => void)[] = [];

    filteredDevices.forEach((device: Device) => {
      if (device.status === "blue" && device.defaultParams) {
        const deviceId = device.id;
        const paramKeys = Object.keys(device.defaultParams);
        paramKeys.forEach((key) => {
          const rawDefault = device.defaultParams?.[key];

          // Parse numeric default value from string or number
          const numericDefault =
            typeof rawDefault === "string"
              ? parseFloat(rawDefault.replace(/[^\d.-]/g, ""))
              : typeof rawDefault === "number"
              ? rawDefault
              : 0;

          // Set range for random generator ±10 around default value
          const [min, max] = [numericDefault - 10, numericDefault + 10];

          // Extract unit from string default value if any
          const unit =
            typeof rawDefault === "string"
              ? rawDefault.replace(/[\d.\-]/g, "")
              : "";

          // Start the random value generator and update liveValues state on each new value
          const stop = startRandomGenerator(min, max, unit, (val) => {
            setLiveValues((prev) => ({
              ...prev,
              [deviceId]: {
                ...(prev[deviceId] || {}),
                [key]: parseFloat(val),
              },
            }));
          });
          console.log(stops)

          stops.push(stop);
        });
      }
    });

    // Cleanup all random generators when dependencies change or component unmounts
    return () => {
      stops.forEach((stop) => stop());
    };
  }, [filteredDevices]);

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
            
            // Build live data to pass down, handling device statuses and fallback values
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
                    time: currentTime,
                    online:
                      device.status === "blue"
                        ? "on"
                        : device.status === "grey"
                        ? "disconnect"
                        : device.status === "red"
                        ? "off"
                        : "unknown",
                    data: {
                      ...dataEntries,
                      time: secondsToTimeString(liveTimesRef.current[device.id] || 0),
                    },
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
