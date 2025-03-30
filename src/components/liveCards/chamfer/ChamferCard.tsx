import React from "react";
import OnOff from "./OnOff";
import { Grid, Paper, Stack, Typography } from "@mui/material";


const Chamfer = ({
  on = true,
  chamferName = "چمفر",
  value = "12 آمپر",
}: {
  on?: boolean;
  chamferName?: string;
  value?: string;
}) => {
  return (
    <Grid
    item
    xs={12}
    sm={6}
    md={3}
    sx={{ marginBottom: { xs: 2, md: 0 } }}>
      <Stack
        component={Paper}
        boxShadow={1}
        sx={{
          bgcolor: on ? "background.enable" : "background.disable",
          display: "flex",
          flexDirection: "column",
          width: "full-width",
          height: "fit-content",
        }}
        p={2}
      >
        <Stack
          flexDirection={"row"}
          width={"100%"}
          height={"fit-content"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack
            gap={1}
            flexDirection={"row"}
            width={"inherit"}
            flexWrap={"wrap"}
            alignItems={"center"}
          >
            <Typography fontWeight={"600"}>{chamferName}</Typography>
          </Stack>
            
          <OnOff on={on} text={on ? "روشن" : "خاموش"} />
        </Stack>
        <Typography
          align="center"
          sx={{ width: "100%", height: "100%", lineHeight: 5 }}
        >
          {value}
        </Typography>
      </Stack>
    </Grid>
  );
};

export default Chamfer;
