import { MainCardType } from "@/interfaces/ui/mainCard/MainCard";
import { Stack } from "@mui/material";
import React from "react";

const MainCard: React.FC<MainCardType> = ({ children, sx }) => {
  return (
    <Stack
      sx={{
        borderRadius: "10px",
        bgcolor: "background.defaultChannel",
        flexGrow: 1,
        p: 2,
        minHeight: "100%",
        ...sx, // Allow additional styles to be passed via sx prop
      }}
    >
      {children}
    </Stack>
  );
};

export default MainCard;
