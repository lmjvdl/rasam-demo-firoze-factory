export interface Device {
  id: string;
  type:
  | "BatchBaalMill"
  | "ContinuesBallMill"
  | "GranuleSillo"
  | "SlurryPitRight"
  | "SlurryPitLeft"
  | "SlurryPump"
  | "SprayDryer"
  | "VibratingScreen";
  status: "blue" | "red" | "grey" | "none";
  lightsConfig: {
    orientation: "horizontal" | "vertical";
    position: "top" | "bottom" | "left" | "right" | "both" | "center";
  };
  name?: string;
  startTime?: string; // Required for red and grey, optional for blue
  current?: string; // Required for blue, optional for red and grey
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
  defaultParams?: Record<string, number | string>;
  extraTooltip?: string;
  paramUnits?: Record<string, string>;
  paramRanges?: Record<string, [number, number]>; 
}

export type LiveValues = Record<string, Record<string, number | undefined>>;
export interface StatusLightsProps {
  orientation: "horizontal" | "vertical";
  position: "top" | "bottom" | "left" | "right" | "both" | "center";
  status: "blue" | "red" | "grey" | "none";
  iconSize: number;
  startTime?: string;
  iconWidth?: number;
  iconHeight?: number;
  hasExtraTooltip?: boolean;
}

// Define the Position interface for absolute positioning
export interface Position {
  top: number;
  left: number;
}

export interface DeviceState {
  devices: Device[];
  setDeviceData: (id: string, data: Partial<Device>) => void;
}


export interface BodyPrepLayoutProps {
  initialDevices?: Device[];
}