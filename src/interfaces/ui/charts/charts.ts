interface Dataset {
    label?: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
    fill?: boolean;
}
  
  interface Options {
    responsive?: boolean;
    plugins?: {
      legend?: {
        display?: boolean;
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
  
export  interface ChartProps {
    data: {
      labels?: string[];
      datasets: Dataset[];
    };
    chartTitle: string;
    options?: Options;
    type: "bar" | "line";
    width?: string;
}

export interface DynamicChartProps {
  chartTitle: string;
  data: any;
  options?: any;
  type?: "bar" | "line";
}