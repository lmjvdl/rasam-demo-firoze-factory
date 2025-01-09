import React, { useState } from "react";
import DynamicChart from "../../../components/Chart/DynamicChart";
import DynamicFilters from "../../../components/Chart/DynamicFilters";
import { DateObject } from "react-multi-date-picker";
import { Box } from "@mui/material";

const ExampleUsage: React.FC = () => {
  const [filters, setFilters] = useState({
    timeRange: [] as DateObject[],
    oneDay: new DateObject(),
    singleSelect: {
      placeholder: "دستگاه",
      options: ["دستگاه ۱", "دستگاه ۲"],
      value: "دستگاه 1",
    },
    multiSelect: {
      placeholder: "دستگاه‌ها",
      options: ["دستگاه ۱", "دستگاه ۲"],
      value: ["دستگاه 1"],

    },
    subRange: ["رنج ۱", "رنج ۲"],
  });

  const [chartData, setChartData] = useState({
    labels: ["ژانویه", "فوریه", "مارس", "آوریل", "مه"],
    datasets: [
      {
        label: "مقدار",
        data: [70, 100, 25, 10, 10],
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
        borderRadius: 150,
      },
    ],
  });

  const handleFilterChange = (
    filterKey: string,
    value: any
  ) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }));
  };

  const handleSearch = () => {
    setChartData({
      labels: ["ژانویه", "فوریه", "مارس", "آوریل", "مه"],
      datasets: [
        {
          label: "مقدار",
          data: [12, 19, 3, 5, 2],
          backgroundColor: ["rgba(75, 192, 192, 1)"],
          borderColor: ["rgba(75, 192, 192, 1)"],
          borderWidth: 1,
          borderRadius: 100,
        },
      ],
    });
  };

  return (
    <Box>
      <DynamicFilters
        filters={filters }
        onChange={handleFilterChange}
        onSearch={handleSearch}
        dropdownTypes={[
          "range",
          "singleSelect",
          "oneDay",
          "multiSelect",
          "subRange",
        ]}
      />
      <DynamicChart chartTitle="چارت تهیه بدنه" data={chartData} type="bar" />
    </Box>
  );
};

export default ExampleUsage;
