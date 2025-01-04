import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: string[];
  borderColor?: string[];
  borderWidth?: number;
  borderRadius?: number;
  inflateAmount?: number | "auto";
}

interface Options {
  responsive?: true,
  locale?: "fa-IR",
  plugins?: {
    title?: {
      display?: true,
      text?: string
    }
  } 
}

interface ChartProps {
  data: {
    labels: string[];
    datasets: Dataset[];
  };
  chartTitle: string;
  options?: Options; 
  type: "bar" | "line";
}


const MajorChart: React.FC<ChartProps> = ({ data, options, type, chartTitle }) => {
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

  return <canvas ref={chartRef} style={{ width: "100%" }} />;
};

export default MajorChart;