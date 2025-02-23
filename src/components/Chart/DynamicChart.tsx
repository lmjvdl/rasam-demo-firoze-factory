import React from 'react';
import MajorChart from './ChartConfig/MajorChart';
import { DynamicChartProps } from '@/interfaces/UI/charts/charts';

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
