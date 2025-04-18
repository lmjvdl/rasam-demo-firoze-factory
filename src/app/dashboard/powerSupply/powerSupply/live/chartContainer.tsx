import { useState, useEffect } from 'react';
import MajorChart from "@/components/chart/chartConfig/MajorChart";
import { getChartJsData } from "@/utils/formatters/getChartJsData";
import { Grid, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Dataset } from '@/interfaces/ui/charts/charts';

interface DeviceProps {
  device: {
    device_code: string;
    time: number;
    data: Record<string, number>;
  };
}

export default function ChartContainer({ device }: DeviceProps) {
  const theme = useTheme();
  const [chartDataHistory, setChartDataHistory] = useState<Record<string, { 
    labels: string[]; 
    datasets: Dataset[] 
  }>>({});

  useEffect(() => {
    const newChartDataHistory: Record<string, { 
      labels: string[]; 
      datasets: Dataset[] 
    }> = {};
    
    Object.entries(device.data).forEach(([key, value]) => {
      const previousData = chartDataHistory[key];
      newChartDataHistory[key] = getChartJsData(
        key, 
        value, 
        previousData,
        theme.palette.primary.main,
        `${theme.palette.primary.main}`
      ).data;
    });

    setChartDataHistory(newChartDataHistory);
  }, [chartDataHistory, device.data, device.time, theme.palette.primary.main]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2} sx={{ 
        color: 'text.primary',
        fontWeight: 'medium'
      }}>
        {device.device_code}
      </Typography>
      <Grid container spacing={3}>
        {Object.entries(device.data).map(([key, value]) => {
          const chartData = chartDataHistory[key] || 
            getChartJsData(
              key, 
              value,
              undefined,
              theme.palette.primary.main,
              `${theme.palette.primary.main}`
            ).data;
          
          return (
            <Grid item xs={12} sm={6} md={4} key={`${device.device_code}-${key}`}>
              <Box sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: 'background.paper',
                boxShadow: 1
              }}>
                <Typography variant="subtitle2" sx={{ 
                  mb: 1,
                  color: 'text.primary'
                }}>
                  {key}
                </Typography>
                <Box sx={{ height: 250 }}>
                  <MajorChart
                    data={chartData}
                    options={getChartJsData(
                      key, 
                      value,
                      undefined,
                      theme.palette.primary.main,
                      `${theme.palette.primary.main}`
                    ).options}
                    type="line"
                  />
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}