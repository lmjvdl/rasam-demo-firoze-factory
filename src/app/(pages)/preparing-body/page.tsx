import BaalMillCard from "@/components/baalMillLive/BaalMillCard";
import MainCard from "@/components/CustomContiner/MainCard";
import { Grid, Paper, Typography } from "@mui/material";

export default function BaalMillLive() {
  const mills = [
    {
      id: 1,
      name: "بالمیل 1",
      status: "on" as "on",
      current: 122,
      frequency: 2400,
      dcVoltage: 220,
      acVoltage: 200,
      temperature: 454,
    },
    {
      id: 2,
      name: "بالمیل 2",
      status: "off" as "off",
      current: 0,
      frequency: 0,
      dcVoltage: 0,
      acVoltage: 0,
      temperature: 0,
    },
    {
      id: 3,
      name: "بالمیل 3",
      status: "on" as "on",
      current: 122,
      frequency: 2400,
      dcVoltage: 220,
      acVoltage: 200,
      temperature: 454,
    },
    {
      id: 4,
      name: "بالمیل 4",
      status: "on" as "on",
      current: 122,
      frequency: 2400,
      dcVoltage: 220,
      acVoltage: 200,
      temperature: 454,
    },
  ];

  return (
    <MainCard sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Grid
          container
          spacing={2}
          sx={{ width: { xs: "90%", md: "95%" }, margin: "20px"}}
        >
          <Grid item xs={12} md={12} sx={{ marginBottom: { xs: 2, md: 0 } }}>
            <Typography display="inline" variant="h4" gutterBottom>
              <span style={{ color: "#0FBDA2", borderRadius: "50px" }}>|</span>
              بالمیل بچ
            </Typography>
            <Grid container spacing={3} marginBlock={3}>
              {mills.map((mill) => (
                <Grid item xs={12} sm={6} md={3} key={mill.id}>
                  <BaalMillCard mill={mill} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
    </MainCard>
  );
}
