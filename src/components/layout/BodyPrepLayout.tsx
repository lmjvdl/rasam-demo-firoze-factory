"use client";

import React, { useEffect, useState, useCallback } from "react";
import MainCardLayoutBodyPrep from "@/components/customContiner/MainCardLayoutBodyPrep";
import { demoData } from "@/components/fakeData/layout/fakeData";
import { BodyPrepLayoutProps, Device } from "@/interfaces/user/layout/layoutBodyPrep";
import { useRouter } from "next/navigation";
import { useLayoutLiveStore } from "@/store/layoutLiveStore";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { useAllDevicesRandomData } from "./hooks/useRandomDataGenerator";
import { DeviceGroupRenderer } from "./DeviceGroupRenderer";

/**
 * Main layout component for the Body Preparation section of the application.
 * Manages device state, handles device interactions, and renders the device layout.
 * 
 * @component
 * @param {BodyPrepLayoutProps} props - Component props
 * @param {Device[]} [props.initialDevices=demoData.devices] - Initial array of devices to display
 * @returns {React.ReactElement} The rendered body preparation layout
 */
const BodyPrepLayout = ({ initialDevices = demoData.devices }: BodyPrepLayoutProps) => {
  const router = useRouter();
  const { setDeviceData } = useLayoutLiveStore();
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [isMounted, setIsMounted] = useState(false);

  // Track component mount status to prevent memory leaks
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  /**
   * Updates device data in local state and global store
   * @param {string} id - Device ID to update
   * @param {Record<string, string>} data - New device data properties
   */
  const updateDevice = useCallback((id: string, data: Record<string, string>) => {
    setDevices(prev =>
      prev.map(d => d.id === id ? { ...d, ...data } : d)
    );
  }, []);

  // Initialize random data generation for all devices
  useAllDevicesRandomData({
    devices,
    updateDevice,
    setDeviceData,
    isActive: isMounted
  });

  /**
   * Handles device click navigation
   * @param {string} deviceType - Type of device clicked
   */
  const handleDeviceClick = (deviceType: string) => {
    router.push(`/bodyPrep?device=${deviceType}`);
  };

  // Show loading screen until component is fully mounted
  if (!isMounted) {
    return <LoadingScreen />;
  }

  return (
    <MainCardLayoutBodyPrep>
      {/* Batch Ball Mill Devices */}
      <DeviceGroupRenderer
        devices={devices}
        filterType="BatchBaalMill"
        positionCalculator={(i) => ({ top: 50, left: -100 + i * 200 })}
        onDeviceClick={handleDeviceClick}
      />

      {/* Spray Dryer Device */}
      <DeviceGroupRenderer
        devices={devices}
        filterType="SprayDryer"
        positionCalculator={() => ({ top: 110, left: -320 })}
        onDeviceClick={handleDeviceClick}
      />

      {/* Slurry Pump Devices */}
      <DeviceGroupRenderer
        devices={devices}
        filterType="SlurryPump"
        positionCalculator={(i: number) => ({ top: 280, left: 100 + i * 65 })}
        onDeviceClick={handleDeviceClick}
      />

      {/* Slurry Pit Devices */}
      <DeviceGroupRenderer
        devices={devices}
        filterType="SlurryPit"
        positionCalculator={(i: number) => ({ top: 300 + i * 132, left: 620 })}
        onDeviceClick={handleDeviceClick}
      />

      {/* Continuous Ball Mill Devices */}
      <DeviceGroupRenderer
        devices={devices}
        filterType="ContinuesBallMill"
        positionCalculator={(i) => ({ top: 1150, left: 150 + i * 260 })}
        onDeviceClick={handleDeviceClick}
      />

      {/* Vibrating Screen Devices */}
      <DeviceGroupRenderer
        devices={devices}
        filterType="VibratingScreen"
        positionCalculator={(i: number) => ({ top: 1088, left: 430 + i * 52 })}
        onDeviceClick={handleDeviceClick}
      />

      {/* Granule Silo Devices */}
      <DeviceGroupRenderer
        devices={devices}
        filterType="GranuleSillo"
        positionCalculator={(i: number) => ({
          top: 300 + (i % 6) * 129,
          left: i < 6 ? -325 : -195,
        })}
        onDeviceClick={handleDeviceClick}
      />
    </MainCardLayoutBodyPrep>
  );
};

export default BodyPrepLayout;