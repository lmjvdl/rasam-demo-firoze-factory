// "use client"

import ChamferCard from "@/components/liveCards/chamfer/ChamferCard";
import useWebSocket from "@/hooks/socket/useSocket";
import { ChamferLiveSchema } from "@/interfaces/chamfer/live";
import { Container, Grid } from "@mui/material";
import useChamferQuery from "./useChamfer";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";

export default function Chamfer() {
  const { data: initialData, isLoading } = useChamferQuery(5);
  const { devices } = useWebSocket<ChamferLiveSchema>(5, initialData || []);

  if (isLoading) return <LoadingScreen />;

  return (
    <Container sx={{ minWidth: "100%", overflowY: "auto" }}>
      <Grid container spacing={3} marginBlock={3}>
        {devices?.map((device) => (
          <Grid item xs={12} sm={6} md={2.5} key={`device-${device.device}-${device.time}`}>
            <ChamferCard chamferName={device.device_code} value={device.data.current} on={device.online}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

