"use client"

import React from "react";
import Chamfer from "@/components/chamfer/Chamfer";
import MainCard from "@/components/customContiner/MainCard";
import { Grid } from "@mui/material";
// import useWebSocket from "@/hooks/socket/useSocket";

const ChamferLive = () => {
  // const { data, loading, error } = useWebSocket("1");

  return (
    <MainCard>
      <Grid
        container
        spacing={2}
        sx={{ width: { xs: "90%", md: "95%" }, margin: "20px" }}>
          <Chamfer />
          <Chamfer on={false} />
          <Chamfer />
          <Chamfer />
          <Chamfer />
      </Grid>
    </MainCard>
  );
};

export default ChamferLive;
