import BaalMillCard from "@/components/liveCards/baalMill/BaalMillCard";
import useWebSocket from "@/hooks/socket/useSocket";
import { FanSprayLiveSchema } from "@/interfaces/preparingBody/live";
import { Container, Grid } from "@mui/material";
import useFanSprayQuery from "./useFanSpray";

export default function BallMills() {
  const { data: initialData, isLoading, isError } = useFanSprayQuery(4);
  const { devices } = useWebSocket<FanSprayLiveSchema>(4, initialData || []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <Container sx={{ minWidth: "100%", overflowY: "auto" }}>
      <Grid container spacing={3} marginBlock={3}>
        {devices?.map((device) => (
          <Grid item xs={12} sm={6} md={2.5} key={`device-${device.device}-${device.time}`}>
            <BaalMillCard {...device} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
