export interface BaalMillProps {
  container?: { // Make `container` optional
    online: boolean;
    device: string;
    time: string;
    product_line_part: number;
    data: {
      current?: number;
      frequency?: number;
      dcVoltage?: number;
      acVoltage?: number;
      temperature?: number;
    };
  };
}