"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      <CircularProgress size={80} thickness={4.5} />
      <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
        لطفاً منتظر بمانید...
      </Typography>
    </Box>
  );
}
