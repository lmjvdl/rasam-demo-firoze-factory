import BaalMillCard from "@/components/liveCards/baalMill/BaalMillCard";
import useWebSocket from "@/hooks/socket/useSocket";
import { BaalMillLiveSchema } from "@/interfaces/preparingBody/live";
import { Container, Grid } from "@mui/material";
import useBaalMillQuery from "./useBaalMill";

export default function BallMills() {
  const initialDataByQuery = useBaalMillQuery(4);
  const { devices } = useWebSocket<BaalMillLiveSchema>(4);

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
