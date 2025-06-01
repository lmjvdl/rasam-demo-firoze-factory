import React from "react";
import { Box, Card, CardContent, Divider, Typography, useTheme } from "@mui/material";
import OnOff from "../dependenciesLiveCards/OnOff";
import { OneSensorProps } from "@/interfaces/user/lives/oneSensor";

export default function OneSensorLiveCard({container}: OneSensorProps) {
  const theme = useTheme();
  
  const safeContainer = container || {};
  const safeData = safeContainer.data || {
    current: 0,
  };

  return (
    <Card
      sx={{ boxShadow: 3 }}
      style={{
        backgroundColor:
          safeContainer.online === "on"
            ? theme.palette.background.default
            : theme.palette.background.disable,
      }}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">{safeContainer.device_code}</Typography>
          <OnOff on={safeContainer.online} />
        </Box>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginBlockStart: "20px",
          }}>
          <Divider />
          <Typography>جریان دستگاه: {safeData.current} A</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

