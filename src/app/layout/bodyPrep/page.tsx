"use client";

import React, { useEffect } from "react";
import MainCardLayoutBodyPrep from "@/components/customContiner/MainCardLayoutBodyPrep";
import { iconMapLayout } from "@/utils/icons/LayoutIcon";
import { Box, Tooltip } from "@mui/material";
import StatusLights from "@/components/layoutDependencies/StatusIndicator";
import { demoData } from "@/components/fakeData/layout/fakeData";
import { Device, Position } from "@/interfaces/user/layout/layoutBodyPrep";
import startRandomGenerator from "@/utils/homeless/randomGenerator";
import { useRouter } from "next/navigation";
import { useLayoutLiveStore } from "@/store/layoutLiveStore";

const iconSize = 10;

const BodyPrepLayout = () => {
  const router = useRouter();

  const { devices, setDeviceData } = useLayoutLiveStore();

  const iconComponents: Record<
    Device["type"],
    React.FC<{ width: number; height: number }>
  > = {
    BatchBaalMill: iconMapLayout["BatchBaalMill"],
    ContinuesBallMill: iconMapLayout["ContinuesBallMill"],
    GranuleSillo: iconMapLayout["GranuleSillo"],
    SlurryPitRight: iconMapLayout["SlurryPitRight"],
    SlurryPitLeft: iconMapLayout["SlurryPitLeft"],
    SlurryPump: iconMapLayout["SlurryPump"],
    SprayDryer: iconMapLayout["SprayDryer"],
    VibratingScreen: iconMapLayout["VibratingScreen"],
  };

  const getIconDimensions = (type: Device["type"]) => {
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
    }
  };

  useEffect(() => {
    const stopFunctions: (() => void)[] = [];
  
    devices.forEach((device) => {
      if (device.status === "blue") {
        const stopTemp = startRandomGenerator(40, 90, "°C", (val) => {
          setDeviceData(device.id, { temprature: val });
        });
  
        const stopCurrent = startRandomGenerator(30, 50, "A", (val) => {
          setDeviceData(device.id, { current: val });
        });
  
        stopFunctions.push(stopTemp, stopCurrent);
      }
    });
  
    return () => stopFunctions.forEach((stop) => stop());
  }, [devices, setDeviceData]);

  useEffect(() => {
    const stopFunctions: (() => void)[] = [];

    demoData.devices.forEach((device) => {
      if (device.status === "blue") {
        const stopTemp = startRandomGenerator(40, 90, "°C", (val) => {
          device.temprature = val;
        });

        const stopCurrent = startRandomGenerator(30, 50, "A", (val) => {
          device.current = val;
        });

        stopFunctions.push(stopTemp, stopCurrent);
      }
    });

    return () => {
      stopFunctions.forEach((stop) => stop());
    };
  }, []);

  const handleIconClick = (deviceType: Device["type"]) => {
    router.push(`/bodyPrep?device=${deviceType}`);
  };

  const renderDevice = (device: Device, index: number, position: Position) => {
    const IconComponent = iconComponents[device.type];
    const { width, height } = getIconDimensions(device.type);

    const tooltipTitle = () => {
      if (device.status === "blue") {
        return `آمپر: ${device.current || "N/A"} | دما: ${
          device.temprature || "N/A"
        }`;
      } else if (device.status === "red") {
        return `مدت زمان خاموش بودن دستگاه: ${device.startTime || "00:00:00"}`;
      } else {
        return `مدت زمان قطع ارتباط: ${device.startTime || "00:00:00"}`;
      }
    };

    return (
      <Tooltip
        key={device.id}
        title={tooltipTitle()}
        placement="top"
        sx={{ zIndex: 20 }}
      >
        <Box
          sx={{ position: "absolute", ...position, cursor: "pointer" }}
          onClick={() => handleIconClick(device.type)}
        >
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
      </Tooltip>
    );
  };

  return (
    <MainCardLayoutBodyPrep>
      {demoData.devices
        .filter((d) => d.type === "BatchBaalMill")
        .map((device, i) =>
          renderDevice(device, i, { top: 50, left: -100 + i * 200 })
        )}
      {demoData.devices
        .filter((d) => d.type === "SprayDryer")
        .map((device, i) => renderDevice(device, i, { top: 110, left: -320 }))}
      {demoData.devices
        .filter((d) => d.type === "SlurryPump")
        .map((device, i) =>
          renderDevice(device, i, { top: 280, left: 100 + i * 65 })
        )}
      {demoData.devices
        .filter((d) => d.type === "SlurryPitRight")
        .map((device, i) =>
          renderDevice(device, i, { top: 300 + i * 132, left: 600 })
        )}
      {demoData.devices
        .filter((d) => d.type === "SlurryPitLeft")
        .map((device, i) =>
          renderDevice(device, i, { top: 300 + i * 132, left: 700 })
        )}
      {demoData.devices
        .filter((d) => d.type === "ContinuesBallMill")
        .map((device, i) =>
          renderDevice(device, i, { top: 1150, left: 150 + i * 260 })
        )}
      {demoData.devices
        .filter((d) => d.type === "VibratingScreen")
        .map((device, i) =>
          renderDevice(device, i, { top: 1088, left: 430 + i * 52 })
        )}
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
