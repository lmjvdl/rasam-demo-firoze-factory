export interface MultiSensorLiveSchema {
  device: number;
  device_code: string;
  product_line_part: number;
  time: number;
  data: {
    current?: number;
    temperature?: number;
    soilSurface?: number;
    WeightIncomingSoil?: string;
    OutputSoilWeight?: string;
    BurnerTemperature?: string;
    OutletTemperature?: string;
    OutputGranuleWeight?: string;
    OutputGranuleTemperature?: string;
    OutputGranuleMoisture?: string;
    WeightSoilEnteringbatchMill?: string;
    WeightIncomingWaterMilliliters?: string;
    FlowRate?: string;
    time?: string;
  };
  online: string;
}


export interface MultiSensorProps {
  container: MultiSensorLiveSchema
}