export interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  tension?: number;
  fill?: boolean;
  pointRadius?: number; 
  pointHoverRadius?: number;
  borderRadius?: number;
}

export interface ChartData {
  labels: string[];
  datasets: Dataset[];
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
      position?: 'top' | 'left' | 'right' | 'bottom' | 'center';
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
      font?: {
        size?: number;
      };
    };
  };
  scales?: {
    x?: {
      display?: boolean;
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
      display?: boolean;
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


// export interface ChartProps {
//   data: ChartData<ChartType>;
//   options?: ChartOptions;
//   type: ChartType;
//   chartTitle: string;
//   width?: string;
//   height?: string;
// }
