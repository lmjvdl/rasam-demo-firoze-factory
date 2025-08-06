export type UnionDataLive = 
    MultiSensorLiveSchema

export interface BaseLiveSchema {
    device: number;
    device_code: string;
    product_line_part: number;
    time: number;
    online: string;
}

export interface MultiSensorLiveSchema extends BaseLiveSchema {
    data: {
      current?: number;
      temperature?: number;
      soilSurface?: number;
      time?: string;
    };
}

export interface LiveManager {
    type: "multiSensor";
    data: {
      container: UnionDataLive;
    };
  }
  