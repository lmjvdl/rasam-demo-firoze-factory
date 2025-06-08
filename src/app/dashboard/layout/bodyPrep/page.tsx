"use client";

import React from "react";
import MainCardLayoutBodyPrep from "@/components/customContiner/MainCardLayoutBodyPrep";
import { iconMapLayout } from "@/utils/icons/LayoutIcon";
import { Box } from "@mui/material";
import StatusLights from "@/components/layoutDependencies/StatusIndicator";
import { demoData } from "@/components/layoutDependencies/fakeData";

const BodyPrepLayout = () => {
    const iconComponents = {
      BatchBaalMill: iconMapLayout["BatchBaalMill"],
      ContinuesBallMill: iconMapLayout["ContinuesBallMill"],
      GranuleSillo: iconMapLayout["GranuleSillo"],
      SlurryPit: iconMapLayout["SlurryPit"],
      SlurryPump: iconMapLayout["SlurryPump"],
      SprayDryer: iconMapLayout["SprayDryer"],
      VibratingScreen: iconMapLayout["VibratingScreen"],
    };
  
    const [iconSize, setIconSize] = React.useState(0);
    const [windowSize, setWindowSize] = React.useState({
      width: 0,
      height: 0,
    });
  
    React.useEffect(() => {
      const updateSize = () =>
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }, []);
  
    React.useEffect(() => {
      if (windowSize.width / 170 <= 0) {
        setIconSize(0);
      } else {
        setIconSize(windowSize.width / 170);
      }
    }, [windowSize.width]);
  
    const renderDevice = (device: any, index: number, position: any) => {
      const IconComponent = iconComponents[device.type as keyof typeof iconComponents];
      const { width, height } = getIconDimensions(device.type);
      return (
        <Box key={index} sx={{ position: "absolute", ...position }}>
          <StatusLights
            orientation={device.lightsConfig.orientation}
            position={device.lightsConfig.position}
            status={device.status}
            iconSize={iconSize}
          />
          <IconComponent width={width * iconSize} height={height * iconSize} />
        </Box>
      );
    };

    const getIconDimensions = (type: string) => {
        switch (type) {
          case "BatchBaalMill":
            return { width: 28, height: 14 };
          case "SprayDryer":
            return { width: 130, height: 110 };
          case "SlurryPump":
            return { width: 13, height: 10 };
          case "SlurryPit":
            return { width: 37, height: 14 };
          case "ContinuesBallMill":
            return { width: 30, height: 48 };
          case "VibratingScreen":
            return { width: 6, height: 10 };
          case "GranuleSillo":
            return { width: 20, height: 14 };
          default:
            return { width: 20, height: 20 };
        }
      };

  return (
    <MainCardLayoutBodyPrep>
      {demoData.devices
        .filter((d) => d.type === "BatchBaalMill")
        .map((device, i) => renderDevice(device, i, { top: 50, left: -100 + i * 200 }))}
      {demoData.devices
        .filter((d) => d.type === "SprayDryer")
        .map((device, i) => renderDevice(device, i, { top: 120, left: -320 }))}
      {demoData.devices
        .filter((d) => d.type === "SlurryPump")
        .map((device, i) => renderDevice(device, i, { top: 260, left: -100 + i * 65 }))}
      {demoData.devices
        .filter((d) => d.type === "SlurryPit")
        .map((device, i) => renderDevice(device, i, { top: 300 + i * 132, left: 600 }))}
      {demoData.devices
        .filter((d) => d.type === "ContinuesBallMill")
        .map((device, i) => renderDevice(device, i, { top: 150, left: 200 + i * 260 }))}
      {demoData.devices
        .filter((d) => d.type === "VibratingScreen")
        .map((device, i) => renderDevice(device, i, { top: 1068, left: 480 + i * 52 }))}
      {demoData.devices
        .filter((d) => d.type === "GranuleSillo")
        .map((device, i) => {
          const isLeftColumn = i < 6;
          return renderDevice(device, i, {
            top: 300 + (i % 6) * 105,
            left: isLeftColumn ? -325 : -220,
          });
        })}
    </MainCardLayoutBodyPrep>
  );
};

export default BodyPrepLayout;