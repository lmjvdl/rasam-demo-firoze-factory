/**
 * @file types.ts
 * @description Type definitions for the BodyPrepLayout component and its related utilities
 */

/**
 * Device status types
 */
export type DeviceStatus = "blue" | "red" | "grey" | "none";

/**
 * Light orientation types
 */
export type LightOrientation = "horizontal" | "vertical";

/**
 * Light position types
 */
export type LightPosition = "top" | "bottom" | "left" | "right" | "both" | "center";

/**
 * Device type definitions
 */
export type DeviceType =
  | "BatchBaalMill"
  | "ContinuesBallMill"
  | "GranuleSillo"
  | "SlurryPitRight"
  | "SlurryPitLeft"
  | "SlurryPump"
  | "SprayDryer"
  | "VibratingScreen";

/**
 * Interface for device configuration
 */
export interface Device {
  id: string;
  type: DeviceType;
  status: DeviceStatus;
  lightsConfig: {
    orientation: LightOrientation;
    position: LightPosition;
  };
  name?: string;
  startTime?: string;
  operatingTime?: string;
  current?: string;
  temprature?: string;
  soilSurface?: string;
  WeightIncomingSoil?: string;
  OutputSoilWeight?: string;
  BurnerTemperature?: string;
  OutletTemperature?: string;
  OutputGranuleWeight?: string;
  OutputGranuleTemperature?: string;
  OutputGranuleMoisture?: string;
  MonopumpCurrent?: string;
  MonopumpTemprature?: string;
  FlowRate?: string;
  defaultParams?: Record<string, number | string>;
  extraTooltip?: string;
  paramUnits?: Record<string, string>;
  paramRanges?: Record<string, [number, number]>;
}

/**
 * Interface for absolute positioning
 */
export interface Position {
  top: number;
  left: number;
}

/**
 * Props for the BodyPrepLayout component
 */
export interface BodyPrepLayoutProps {
  initialDevices?: Device[];
}

/**
 * Props for the DeviceRenderer component
 */
export interface DeviceRendererProps {
  device: Device;
  position: Position;
  onClick: (deviceType: DeviceType) => void;
  iconSize?: number;
}

/**
 * Props for the DeviceGroupRenderer component
 */
export interface DeviceGroupRendererProps {
  devices: Device[];
  filter: DeviceType;
  positionFunc: (index: number) => Position;
  onClick: (deviceType: DeviceType) => void;
}

export interface RandomDataGeneratorConfig {
  deviceId: string;
  status: string;
  updateDevice: (id: string, data: Record<string, string>) => void;
  setDeviceData: (id: string, data: Record<string, string>) => void;
}

export interface DeviceRendererProps {
  devices: Device[];
  deviceType: string;
  positionCalculator: (index: number) => Position;
  handleIconClick: (deviceType: string) => void;
  iconSize?: number;
}

export interface StatusLightsProps {
  orientation: "horizontal" | "vertical";
  position: "top" | "bottom" | "left" | "right" | "both" | "center";
  status: "blue" | "red" | "grey" | "none";
  iconSize: number;
  startTime?: string;
  iconWidth?: number;
  iconHeight?: number;
  hasExtraTooltip?: boolean;
  extraTooltipContent?: string;
}


export interface DeviceState {
  devices: Device[];
  setDeviceData: (id: string, data: Partial<Device>) => void;
}