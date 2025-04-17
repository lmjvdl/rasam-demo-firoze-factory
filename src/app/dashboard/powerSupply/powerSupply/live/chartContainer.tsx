import MajorChart from "@/components/chart/chartConfig/MajorChart";
import { getChartJsData } from "@/utils/formatters/getChartJsData";
import { Grid, Typography, Box } from "@mui/material";

interface DeviceProps {
    device: {
      device_code: string;
      time: number;
      data: Record<string, number>;
    };
  }
  
  export default function ChartContainer({ device }: DeviceProps) {
    return (
      <Box>
        <Typography variant="h6" mb={2}>
          {device.device_code}
        </Typography>
        <Grid container spacing={3}>
          {Object.entries(device.data).map(([key, value]) => {
            const chartData = getChartJsData(key, value, device.time);
            return (
              <Grid item xs={12} sm={6} md={4} key={`${device.device_code}-${key}`}>
                <MajorChart
                  data={chartData.data}
                  options={chartData.options}
                  type="line"
                  chartTitle={key}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  }
  
