"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import MainCardLayoutBodyPrep from "@/components/customContiner/MainCardLayoutBodyPrep";
import { demoData } from "@/components/fakeData/layout/fakeData";
import { BodyPrepLayoutProps, Device } from "@/interfaces/user/layout/layoutBodyPrep";
import { useRouter } from "next/navigation";
import { useLayoutLiveStore } from "@/store/layoutLiveStore";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { useAllDevicesRandomData } from "./hooks/useRandomDataGenerator";
import { DeviceGroupRenderer } from "./DeviceGroupRenderer";

const BodyPrepLayout = ({ initialDevices = demoData.devices }: BodyPrepLayoutProps) => {
  const router = useRouter();
  const { setDeviceData } = useLayoutLiveStore();
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [isMounted, setIsMounted] = useState(false);

  // Ref to store pending updates for batching
  const pendingUpdatesRef = useRef<Record<string, Record<string, string>>>({});

  // Track component mount status to prevent memory leaks
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Batch update devices every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (Object.keys(pendingUpdatesRef.current).length > 0) {
        setDevices((prev) =>
          prev.map((d) =>
            pendingUpdatesRef.current[d.id]
              ? { ...d, ...pendingUpdatesRef.current[d.id] }
              : d
          )
        );
        pendingUpdatesRef.current = {}; // Clear pending updates after applying
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Updates device data in local state and global store
  const updateDevice = useCallback((id: string, data: Record<string, string>) => {
    pendingUpdatesRef.current = {
      ...pendingUpdatesRef.current,
      [id]: {
        ...(pendingUpdatesRef.current[id] || {}),
        ...data,
      },
    };
  }, []);

  // Initialize random data generation for all devices
  useAllDevicesRandomData({
    devices,
    updateDevice,
    setDeviceData,
    isActive: isMounted,
  });

  // Handles device click navigation
  const handleDeviceClick = useCallback((deviceType: string) => {
    router.push(`/bodyPrep?device=${deviceType}`);
  }, [router]);

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