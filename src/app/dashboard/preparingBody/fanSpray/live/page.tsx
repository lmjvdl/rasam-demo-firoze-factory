// import BaalMillCard from "@/components/liveCards/baalMill/BaalMillCard";
import useWebSocket from "@/hooks/socket/useSocket";
// import { FanSprayLiveSchema } from "@/interfaces/preparingBody/live";
import { Container, Grid } from "@mui/material";
import useFanSprayQuery from "./useFanSpray";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";

export default function FanSpary() {
  const { data: initialData, isLoading } = useFanSprayQuery(5);
  // const { devices } = useWebSocket<FanSprayLiveSchema>(5, initialData || []);

  if (isLoading) return <LoadingScreen />;

  return (
    <Container sx={{ minWidth: "100%", overflowY: "auto" }}>
      <Grid container spacing={3} marginBlock={3}>
        {/* {devices?.map((device) => (
          <Grid item xs={12} sm={6} md={2.5} key={`device-${device.device}-${device.time}`}>
            <BaalMillCard {...device} />
          </Grid>
        ))} */}
      </Grid>
    </Container>
  );
}
