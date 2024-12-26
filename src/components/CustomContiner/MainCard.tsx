import { Stack, SxProps } from "@mui/material";
import React from "react";

interface MainCardType {
  children: React.ReactNode;
  sx?: SxProps;
}

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
