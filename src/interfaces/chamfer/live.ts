export interface ChamferLiveSchema {
    device: number;
    device_code: string;
    product_line_part: number;
    time: number;
    data: {
      current?: number;
    };
    online: string;
  }