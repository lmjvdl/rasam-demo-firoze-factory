import React, { useState } from 'react';
import BarChart from './ChartConfig/BarChart';
import Filters from './SelectReport/Filters';
import { DateObject } from 'react-multi-date-picker';

const Index: React.FC = () => {
  const [filters, setFilters] = useState({
    timeRange: [] as DateObject[], 
    oneDay: undefined as DateObject | undefined, 
    device: [] as string[],
  });
  

  const [chartData, setChartData] = useState({
    labels: ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه'],
    datasets: [
      {
        label: 'مقدار',
        data: [70, 100, 25, 10, 10],
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  });

  const handleFilterChange = (filterKey: string, value: string | number | string[]) => { // تغییر نوع value
    setFilters((prev) => ({ ...prev, [filterKey]: value }));
  };
  
  const handleSearch = () => {
    const newChartData = {
      labels: ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه'],
      datasets: [
        {
          label: 'مقدار',
          data:
            filters.type === 'type1'
              ? [12, 19, 3, 5, 2]
              : [7, 11, 5, 8, 3],
          backgroundColor: ['rgba(75, 192, 192, 1)'],
          borderColor: ['rgba(75, 192, 192, 1)'],
          borderWidth: 1,
          borderRadius: 8,
        },
      ],
    };
    setChartData(newChartData);
  };

  return (
    <div>
      <Filters
        filters={filters}
        onChange={handleFilterChange} 
        onSearch={handleSearch}
        dropdownTypes={['range', 'device', 'oneDay']}
      />
      <BarChart data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default Index;
