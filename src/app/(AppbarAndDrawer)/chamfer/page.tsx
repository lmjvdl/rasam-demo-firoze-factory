import Chamfer from "@/components/Chamfer/Chamfer";
import MainCard from "@/components/CustomContiner/MainCard";
import { Grid } from "@mui/material";
import React from "react";

const page = () => {
  return (
    <>
      <MainCard sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Grid
          container
          spacing={2}
          sx={{ width: { xs: "90%", md: "95%" }, margin: "20px" }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ marginBottom: { xs: 2, md: 0 } }}
          >
            <Chamfer />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ marginBottom: { xs: 2, md: 0 } }}
          >
            <Chamfer on={false} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ marginBottom: { xs: 2, md: 0 } }}
          >
            <Chamfer />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ marginBottom: { xs: 2, md: 0 } }}
          >
            <Chamfer />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ marginBottom: { xs: 2, md: 0 } }}
          >
            <Chamfer />
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default page;
