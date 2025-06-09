"use client";

import React from "react";
import MainCardLayoutBodyPrep from "@/components/customContiner/MainCardLayoutBodyPrep";
import { iconMapLayout } from "@/utils/icons/LayoutIcon";
import { Box } from "@mui/material";
import StatusLights from "@/components/layoutDependencies/StatusIndicator";
import { demoData } from "@/components/layoutDependencies/fakeData";

const iconSize = 10;

const BodyPrepLayout = () => {
  const iconComponents = {
    BatchBaalMill: iconMapLayout["BatchBaalMill"],
    ContinuesBallMill: iconMapLayout["ContinuesBallMill"],
    GranuleSillo: iconMapLayout["GranuleSillo"],
    SlurryPitRight: iconMapLayout["SlurryPitRight"],
    SlurryPitLeft: iconMapLayout["SlurryPitLeft"],
    SlurryPump: iconMapLayout["SlurryPump"],
    SprayDryer: iconMapLayout["SprayDryer"],
    VibratingScreen: iconMapLayout["VibratingScreen"],
  };

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
          startTime={device.startTime}
          iconWidth={width * iconSize}
          iconHeight={height * iconSize}
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
      case "SlurryPitRight":
        return { width: 33, height: 13 };
      case "SlurryPitLeft":
        return { width: 33, height: 13 };
      case "ContinuesBallMill":
        return { width: 30, height: 48 };
      case "VibratingScreen":
        return { width: 6, height: 10 };
      case "GranuleSillo":
        return { width: 14, height: 14 };
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
        .map((device, i) => renderDevice(device, i, { top: 110, left: -320 }))}
      {demoData.devices
        .filter((d) => d.type === "SlurryPump")
        .map((device, i) => renderDevice(device, i, { top: 280, left: 100 + i * 65 }))}
      {demoData.devices
        .filter((d) => d.type === "SlurryPitRight")
        .map((device, i) => renderDevice(device, i, { top: 300 + i * 132, left: 600 }))}
      {demoData.devices
        .filter((d) => d.type === "SlurryPitLeft")
        .map((device, i) => renderDevice(device, i, { top: 300 + i * 132, left: 700 }))}
      {demoData.devices
        .filter((d) => d.type === "ContinuesBallMill")
        .map((device, i) => renderDevice(device, i, { top: 1150, left: 150 + i * 260 }))}
      {demoData.devices
        .filter((d) => d.type === "VibratingScreen")
        .map((device, i) => renderDevice(device, i, { top: 1088, left: 430 + i * 52 }))}
      {demoData.devices
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