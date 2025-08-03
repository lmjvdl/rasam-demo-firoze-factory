"use client";

import React, { useEffect, useState } from "react";
import MainCardLayoutBodyPrep from "@/components/customContiner/MainCardLayoutBodyPrep";
import { Box, Tooltip } from "@mui/material";
import StatusLights from "@/components/layoutDependencies/page";
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
          setDevices(prev =>
            prev.map(d => d.id === device.id ? { ...d, temprature: val } : d)
          );
          setDeviceData(device.id, { temprature: val });
        });
  
        const stopCurrent = startRandomGenerator(30, 50, "A", (val) => {
          setDevices(prev =>
            prev.map(d => d.id === device.id ? { ...d, current: val } : d)
          );
          setDeviceData(device.id, { current: val });
        });
  
        const stopSoilSurface = startRandomGenerator(1, 10, "m", (val) => {
          setDevices(prev =>
            prev.map(d => d.id === device.id ? { ...d, soilSurface: val } : d)
          );
          setDeviceData(device.id, { soilSurface: val });
        });
  
        const stopWeightIncomingSoil = startRandomGenerator(100, 300, "kg", (val) => {
          setDevices(prev =>
            prev.map(d => d.id === device.id ? { ...d, WeightIncomingSoil: val } : d)
          );
          setDeviceData(device.id, { WeightIncomingSoil: val });
        });
  
        const stopOutputSoilWeight = startRandomGenerator(80, 280, "kg", (val) => {
          setDevices(prev =>
            prev.map(d => d.id === device.id ? { ...d, OutputSoilWeight: val } : d)
          );
          setDeviceData(device.id, { OutputSoilWeight: val });
        });
  
        const stopBurnerTemperature = startRandomGenerator(300, 600, "°C", (val) => {
          setDevices(prev =>
            prev.map(d => d.id === device.id ? { ...d, BurnerTemperature: val } : d)
          );
          setDeviceData(device.id, { BurnerTemperature: val });
        });
  
        const stopOutletTemperature = startRandomGenerator(100, 200, "°C", (val) => {
          setDevices(prev =>
            prev.map(d => d.id === device.id ? { ...d, OutletTemperature: val } : d)
          );
          setDeviceData(device.id, { OutletTemperature: val });
        });
  
        const stopOutputGranuleWeight = startRandomGenerator(50, 150, "kg", (val) => {
          setDevices(prev =>
            prev.map(d => d.id === device.id ? { ...d, OutputGranuleWeight: val } : d)
          );
          setDeviceData(device.id, { OutputGranuleWeight: val });
        });
  
        const stopOutputGranuleTemperature = startRandomGenerator(100, 300, "°C", (val) => {
          setDevices(prev =>
            prev.map(d => d.id === device.id ? { ...d, OutputGranuleTemperature: val } : d)
          );
          setDeviceData(device.id, { OutputGranuleTemperature: val });
        });
  
        const stopOutputGranuleMoisture = startRandomGenerator(1, 20, "%", (val) => {
          setDevices(prev =>
            prev.map(d => d.id === device.id ? { ...d, OutputGranuleMoisture: val } : d)
          );
          setDeviceData(device.id, { OutputGranuleMoisture: val });
        });
  
        const stopMonopumpCurrent = startRandomGenerator(10, 30, "A", (val) => {
          setDevices(prev =>
            prev.map(d => d.id === device.id ? { ...d, MonopumpCurrent: val } : d)
          );
          setDeviceData(device.id, { MonopumpCurrent: val });
        });
  
        const stopMonopumpTemprature = startRandomGenerator(40, 100, "°C", (val) => {
          setDevices(prev =>
            prev.map(d => d.id === device.id ? { ...d, MonopumpTemprature: val } : d)
          );
          setDeviceData(device.id, { MonopumpTemprature: val });
        });
  
        stopFunctions.push(
          stopTemp,
          stopCurrent,
          stopSoilSurface,
          stopWeightIncomingSoil,
          stopOutputSoilWeight,
          stopBurnerTemperature,
          stopOutletTemperature,
          stopOutputGranuleWeight,
          stopOutputGranuleTemperature,
          stopOutputGranuleMoisture,
          stopMonopumpCurrent,
          stopMonopumpTemprature
        );
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
        title={<span dangerouslySetInnerHTML={{ __html: tooltipTitle(device) }} />}
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
              extraTooltipContent={device.extraTooltip}
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