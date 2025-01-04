import React, { useState } from 'react';
import MajorChart from './ChartConfig/MajorChart';
import Filters from './SelectReport/Filters';
import { DateObject } from 'react-multi-date-picker';
import { Box } from '@mui/material';


const Index: React.FC = () => {
  const [filters, setFilters] = useState({
    timeRange: [] as DateObject[], 
    oneDay: new DateObject(),
    singleSelect: { placeholder: "دستگاه" as string, options: [] as string[] },
    multiSelect: { placeholder: "دستگاه ها" as string, options: [] as string[] },
    subRange: [] as string[]
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
    type: "bar",
    options: {
      plugins: {
        title: {
          display: true,
          text: "نمودار تهیه بدنه"
        }
      } 
    }
  });


  const handleFilterChange = (filterKey: string, value: string | number | string[]) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }));
  };
  
  const handleSearch = () => {
    const newChartData = {
      labels: ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه'],
      chartTitle: "نمودار مصرفی تهیه بدنه",
      datasets: [
        {
          label: 'مقدار',
          data: [12, 19, 3, 5, 2],
          backgroundColor: ['rgba(75, 192, 192, 1)'],
          borderColor: ['rgba(75, 192, 192, 1)'],
          borderWidth: 1,
          borderRadius: 8,
        },
      ],
      type: "bar",
      options: {
        plugins: {
          title: {
            display: true,
            text: "نمودار تهیه بدنه"
          }
        } 
      }
    };
    setChartData(newChartData);
  };

  return (
    <Box>
      <Filters
        filters={filters}
        onChange={handleFilterChange} 
        onSearch={handleSearch}
        dropdownTypes={['range', 'singleSelect', 'oneDay', 'multiSelect', 'subRange']}
      />
      <MajorChart options={chartData.options} type='bar' data={chartData} />
    </Box>
  );
};

export default Index;
