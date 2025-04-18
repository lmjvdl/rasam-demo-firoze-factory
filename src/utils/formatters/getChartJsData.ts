import { Dataset } from "@/interfaces/ui/charts/charts";

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
      enabled?: boolean;
      intersect?: boolean;
      mode?: 'index' | 'point' | 'nearest' | 'dataset' | 'x' | 'y';
      backgroundColor?: string;
      titleFont?: {
        size?: number;
      };
      bodyFont?: {
        size?: number;
      };
      padding?: number;
    };
  };
  scales?: {
    x?: {
      display?: boolean;
      grid?: {
        display?: boolean;
        color?: string;
        drawBorder?: boolean;
      };
      ticks?: {
        display?: boolean;
        color?: string;
        font?: {
          size?: number;
        };
        padding?: number;
      };
    };
    y?: {
      display?: boolean;
      grid?: {
        display?: boolean;
        color?: string;
        drawBorder?: boolean;
      };
      ticks?: {
        display?: boolean;
        color?: string;
        font?: {
          size?: number;
        };
        padding?: number;
      };
    };
  };
  elements?: {
    line?: {
      cubicInterpolationMode?: 'default' | 'monotone';
    };
  };
}

export function getChartJsData(
  label: string,
  value: number,
  previousData?: { labels: string[]; datasets: Dataset[] },
  primaryColor: string = "primary.main",
  primaryLightColor: string = "primary.main"
): {
  data: { labels: string[]; datasets: Dataset[] };
  options: ChartOptions;
} {
  const MAX_DATA_POINTS = 100;
  const now = new Date();
  const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  const newLabels = previousData 
    ? [...previousData.labels, timeLabel].slice(-MAX_DATA_POINTS)
    : [timeLabel];

  const newData = previousData?.datasets[0]?.data
    ? [...previousData.datasets[0].data, value].slice(-MAX_DATA_POINTS)
    : [value];

  return {
    data: {
      labels: newLabels,
      datasets: [
        {
          label,
          data: newData,
          fill: false,
          backgroundColor: primaryLightColor,
          borderColor: primaryColor,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          intersect: false,
          mode: 'index',
          backgroundColor: 'background.default',
          titleFont: {
            size: 12,
          },
          bodyFont: {
            size: 12,
          },
          padding: 8,
        },
      },
      animation: {
        duration: 0,
      },
      scales: {
        x: {
          display: true,
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
          },
        },
        y: {
          display: true,
          grid: {
            color: 'transparent',
            drawBorder: false,
          },
          ticks: {
            color: 'text.primary',
            font: {
              size: 11,
            },
            padding: 8,
          },
        },
      },
      elements: {
        line: {
          cubicInterpolationMode: 'monotone',
        },
      },
    },
  };
}