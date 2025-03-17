import BaalMillCard from "@/components/baalMillLive/BaalMillCard";
import useWebSocket from "@/hooks/socket/useSocket";
import { FanSprayLiveSchema } from "@/interfaces/preparingBody/live";
import { Container, Grid } from "@mui/material";
import useFanSprayQuery from "./useFanSpray";

export default function FanSpray() {
  const initialDataByQuery = useFanSprayQuery(5);
  const { devices } = useWebSocket<FanSprayLiveSchema>(4);

  const mergedDevices = initialDataByQuery?.data.map((device) => {
    const liveDevice = devices.find((d) => d.device === device.device);
    return liveDevice ? { ...device, ...liveDevice } : device;
  });

  return (
    <Container sx={{ minWidth: "100%", overflowY: "auto" }}>
      <Grid container spacing={3} marginBlock={3}>
        {mergedDevices?.map((device) => (
          <Grid item xs={12} sm={6} md={2.5} key={device.device}>
            <BaalMillCard {...device} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
