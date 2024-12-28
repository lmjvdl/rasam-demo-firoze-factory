import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string[];
      borderColor?: string[];
      borderWidth?: number;
      borderRadius?: number;
      inflateAmount?: number | "auto";
    }[];
  };
  options?: any;
}

const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'bar',
        data,
        options,
      });
    }
  }, [data, options]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
