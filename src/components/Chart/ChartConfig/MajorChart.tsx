"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

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

interface ChartProps {
  data: {
    labels?: string[];
    datasets: Dataset[];
  };
  chartTitle: string;
  options?: Options;
  type: "bar" | "line";
  width?: string;
}

const MajorChart: React.FC<ChartProps> = ({
  data,
  options,
  type,
  chartTitle,
  width = "100%",
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      chartInstanceRef.current = new Chart(chartRef.current, {
        type,
        data,
        options,
      });
    }
  }, [data, options, type, chartTitle]);

  return (
    <div style={{ width }}>
      <canvas ref={chartRef} style={{ width: "100%" }} />
    </div>
  );
};

export default MajorChart;
