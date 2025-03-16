import { Container, Grid, Typography } from "@mui/material";
import BaalMillCard from "./BaalMillCard";
import useWebSocket from "@/hooks/socket/useSocket";

export default function BaalMillLive() {
  const { devices, loading, error } = useWebSocket("1");

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container sx={{ minWidth: "100%", overflowY: "auto" }}>
      <Typography display="inline" variant="h4" gutterBottom>
        <span style={{ color: "#0FBDA2", borderRadius: "50px" }}> | </span>
        بالمیل بچ{" "}
      </Typography>
      <Grid container spacing={3} marginBlock={3}>
        {devices.map((device) => (
          <Grid item xs={12} sm={6} md={2.5} key={device.device}>
            <BaalMillCard container={device} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}