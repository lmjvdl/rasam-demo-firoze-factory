// components/DeviceGroupRenderer.tsx
import React from "react";
import { Device, Position } from "@/interfaces/user/layout/layoutBodyPrep";
import { DeviceRenderer } from "./DeviceRenderer";

interface DeviceGroupRendererProps {
  devices: Device[];
  filterType: string;
  positionCalculator: (index: number) => Position;
  onDeviceClick: (deviceType: string) => void;
}

export const DeviceGroupRenderer: React.FC<DeviceGroupRendererProps> = ({
  devices,
  filterType,
  positionCalculator,
  onDeviceClick,
}) => {
  const filteredDevices = devices.filter((d) => d.type === filterType);

  return (
    <>
      {filteredDevices.map((device, index) => (
        <DeviceRenderer
          key={device.id}
          device={device}
          position={positionCalculator(index)}
          onClick={onDeviceClick}
        />
      ))}
    </>
  );
};