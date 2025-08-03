"use client";

import React, { useEffect, useState } from "react";
import MainCardLayoutBodyPrep from "@/components/customContiner/MainCardLayoutBodyPrep";
import { Box, Tooltip } from "@mui/material";
import StatusLights from "@/components/layoutDependencies/StatusIndicator";
import { demoData } from "@/components/fakeData/layout/fakeData";
import { BodyPrepLayoutProps, Device, Position } from "@/interfaces/user/layout/layoutBodyPrep";
import startRandomGenerator from "@/utils/homeless/randomGenerator";
import { useRouter } from "next/navigation";
import { useLayoutLiveStore } from "@/store/layoutLiveStore";
import { iconComponents } from "@/utils/refinedData/refinedData";
import { tooltipTitle } from "./tooltipContent";
import { getIconDimensions } from "./iconConfigs";
import LoadingScreen from "../loadingScreen/LoadingScreen";

const ICON_SIZE = 10;

const BodyPrepLayout = ({ initialDevices = demoData.devices }: BodyPrepLayoutProps) => {
  const router = useRouter();
  const { setDeviceData } = useLayoutLiveStore();
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const stopFunctions: (() => void)[] = [];

    devices.forEach((device) => {
      if (device.status === "blue") {
        const stopTemp = startRandomGenerator(40, 90, "C°", (val) => {
          setDevices(prevDevices =>
            prevDevices.map(d =>
              d.id === device.id ? { ...d, temprature: val } : d
            )
          );
          setDeviceData(device.id, { temprature: val });
        });

        const stopCurrent = startRandomGenerator(30, 50, "A", (val) => {
          setDevices(prevDevices =>
            prevDevices.map(d =>
              d.id === device.id ? { ...d, current: val } : d
            )
          );
          setDeviceData(device.id, { current: val });
        });

        const stopSoilSurface = startRandomGenerator(1, 10, "m", (val) => {
          setDevices(prevDevices =>
            prevDevices.map(d =>
              d.id === device.id ? { ...d, soilSurface: val } : d
            )
          );
          setDeviceData(device.id, { soilSurface: val });
        });

        stopFunctions.push(stopTemp, stopCurrent, stopSoilSurface);
      }
    });

    return () => {
      stopFunctions.forEach((stop) => stop());
    };
  }, [devices, isMounted, setDeviceData]);

  const handleIconClick = (deviceType: Device["type"]) => {
    router.push(`/bodyPrep?device=${deviceType}`);
  };

  const renderDevice = (device: Device, index: number, position: Position) => {
    const IconComponent = iconComponents[device.type];
    const { width, height } = getIconDimensions(device.type);

    return (
      <Tooltip
        key={device.id}
        title={tooltipTitle(device)}
        placement="top"
        sx={{ zIndex: 20 }}
      >
        <Box
          dir="ltr"
          sx={{ position: "absolute", ...position, cursor: "pointer" }}
          onClick={() => handleIconClick(device.type)}
        >
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <StatusLights
              orientation={device.lightsConfig.orientation}
              position={device.lightsConfig.position}
              status={device.status}
              iconSize={ICON_SIZE}
              startTime={device.startTime}
              iconWidth={width * ICON_SIZE}
              iconHeight={height * ICON_SIZE}
              hasExtraTooltip={!!device.extraTooltip}
            />
            <IconComponent width={width * ICON_SIZE} height={height * ICON_SIZE} />
          </Box>
        </Box>
      </Tooltip>
    );
  };

  if (!isMounted) {
    return <LoadingScreen />;
  }

  return (
    <MainCardLayoutBodyPrep>
      {devices
        .filter((d) => d.type === "BatchBaalMill")
        .map((device, i) =>
          renderDevice(device, i, { top: 50, left: -100 + i * 200 })
        )}
      {devices
        .filter((d) => d.type === "SprayDryer")
        .map((device, i) => renderDevice(device, i, { top: 110, left: -320 }))}
      {devices
        .filter((d) => d.type === "SlurryPump")
        .map((device, i) =>
          renderDevice(device, i, { top: 280, left: 100 + i * 65 })
        )}
      {devices
        .filter((d) => d.type === "SlurryPitRight")
        .map((device, i) =>
          renderDevice(device, i, { top: 300 + i * 132, left: 600 })
        )}
      {devices
        .filter((d) => d.type === "SlurryPitLeft")
        .map((device, i) =>
          renderDevice(device, i, { top: 300 + i * 132, left: 700 })
        )}
      {devices
        .filter((d) => d.type === "ContinuesBallMill")
        .map((device, i) =>
          renderDevice(device, i, { top: 1150, left: 150 + i * 260 })
        )}
      {devices
        .filter((d) => d.type === "VibratingScreen")
        .map((device, i) =>
          renderDevice(device, i, { top: 1088, left: 430 + i * 52 })
        )}
      {devices
        .filter((d) => d.type === "GranuleSillo")
        .map((device, i) => {
          const isLeftColumn = i < 6;
          return renderDevice(device, i, {
            top: 300 + (i % 6) * 129,
            left: isLeftColumn ? -325 : -195,
          });
        })}
    </MainCardLayoutBodyPrep>
  );
};

export default BodyPrepLayout;