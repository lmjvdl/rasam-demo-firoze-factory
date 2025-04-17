import { ChartTypeRegistry, CoreChartOptions, ElementChartOptions, PluginChartOptions, DatasetChartOptions, ScaleChartOptions } from 'chart.js';
export interface DataType {
    device_id: number;
    device_name_fa: string;
    allowed_data: { [key: string]: string };
    data: { [key: string]: number }[];
}
  
export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


export interface PowerSupplyLiveSchema {
    online: string;
    device: number;
    time: number;
    product_line_part: number;
    device_code: string;
    data: {
      currentL1: number;
      currentL2: number;
      currentL3: number;
      currentAvg: number;
      VoltageAvg: number;
      ActivePowerTotal: number;
      ApparentPowerTotal: number;
      PowerFactorTotal: number;
      ActiveEnergyDelivered: number;
    };
  }


  // src/interfaces/ui/charts/charts.ts

export interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  tension?: number;
  fill?: boolean;
  pointRadius?: number;
}

export interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  animation?: {
    duration?: number;
  };
  plugins?: {
    legend?: {
      display?: boolean;
      position?: 'top' | 'left' | 'right' | 'bottom' | 'center' | { [scaleId: string]: number };
      labels?: {
        usePointStyle?: boolean;
      };
    };
    tooltip?: {
      callbacks?: {
        label?: (context: any) => string;
      };
    };
    title?: {
      display?: boolean;
      text?: string;
    };
  };
  scales?: {
    x?: {
      border?: {
        display?: boolean;
      };
      grid?: {
        display?: boolean;
        drawOnChartArea?: boolean;
        drawTicks?: boolean;
      };
    };
    y?: {
      beginAtZero?: boolean;
      border?: {
        display?: boolean;
      };
      grid?: {
        display?: boolean;
        drawOnChartArea?: boolean;
        drawTicks?: boolean;
      };
    };
  };
}

export interface ChartProps {
  data: {
    labels: string[];
    datasets: Dataset[];
  };
  options?: ChartOptions;
  type: keyof ChartTypeRegistry;
  chartTitle: string;
  width?: string;
  height?: string;
}