"use client";

import { Container, Grid } from "@mui/material";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import usePowerSupplyQuery from "./usePowerSupply";
import ChartContainer from "./chartContainer";
import useWebSocket from "@/hooks/socket/useSocket";

interface Props {
  productLinePartId: number;
}

export default function PowerSupply({ productLinePartId }: Props) {
  const { data: initialData, isLoading } =
    usePowerSupplyQuery(productLinePartId);
  const { devices } = useWebSocket(productLinePartId, initialData || []);

  if (isLoading) return <LoadingScreen />;

  return (
    <Container sx={{ minWidth: "100%", overflowY: "auto" }}>
      <Grid container spacing={4}>
        {devices.map((device) => {
          const formattedDevice = {
            device_code: `Device ${device.device_code}`,
            time: device.time,
            data: device.data,
          };

          return (
            <Grid item xs={12} key={`device-${device.device}`}>
              <ChartContainer device={formattedDevice} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
