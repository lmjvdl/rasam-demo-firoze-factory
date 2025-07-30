export interface MultiSensorLiveSchema {
    device: number;
    device_code: string;
    product_line_part: number;
    time: number;
    data: {
      current?: number;
      temperature?: number;
      soilSurface?: number;
    };
    online: string;
}

export interface MultiSensorProps {
  container: MultiSensorLiveSchema
}