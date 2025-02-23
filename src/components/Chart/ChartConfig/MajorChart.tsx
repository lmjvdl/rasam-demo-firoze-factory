"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ChartProps } from "@/interfaces/UI/charts/charts";

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
