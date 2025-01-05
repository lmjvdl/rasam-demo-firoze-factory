import React from 'react';
import MajorChart from './ChartConfig/MajorChart';

interface DynamicChartProps {
  chartTitle: string;
  data: any;
  options?: any;
  type?: "bar" | "line";
}

const DynamicChart: React.FC<DynamicChartProps> = ({ chartTitle, data, options, type = 'bar' }) => {
  return (
    <MajorChart
      chartTitle={chartTitle}
      data={data}
      options={options}
      type={type}
    />
  );
};

export default DynamicChart;
