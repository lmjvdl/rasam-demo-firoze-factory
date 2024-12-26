import React from "react";
import OnOff from "./OnOff";
import { Paper, Stack, Typography } from "@mui/material";
import ChamferIcon from "../Icons/Chamfer";
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
    <Stack
      component={Paper}
      boxShadow={1}
      sx={{
        bgcolor: on ? "background.defaultChannel" : "background.default",
      }}
      width={350}
      height={150}
      flexDirection={"column"}
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
          alignItems={"center"}
        >
          <ChamferIcon />
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
  );
};

export default Chamfer;
