export interface BaalMillLiveSchema {
  device: number;
  device_code: string;
  product_line_part: number;
  time: number;
  data: {
    current?: number;
    frequency?: number;
    dcVoltage?: number;
    acVoltage?: number;
    temperature?: number;
  };
  online: string;
}

export interface FanSprayLiveSchema {
  device: number;
  device_code: string;
  product_line_part: number;
  time: number;
  data: {
    current?: number;
    frequency?: number;
    dcVoltage?: number;
    acVoltage?: number;
    temperature?: number;
  };
  online: string;
}