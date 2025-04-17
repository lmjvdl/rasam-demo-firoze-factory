import { Dataset, ChartOptions as CustomChartOptions } from "@/interfaces/ui/charts/charts";

export function getChartJsData(
  label: string,
  value: number,
  time: number
): {
  data: { labels: string[]; datasets: Dataset[] };
  options: CustomChartOptions;
} {
  return {
    data: {
      labels: [],
      datasets: [
        {
          label,
          data: [value],
          borderColor: "#42a5f5",
          fill: false,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      animation: {
        duration: 0,
      },
      scales: {
        x: {
          display: true,
        },
        y: {
          display: true,
        },
      },
    },
  };
}
