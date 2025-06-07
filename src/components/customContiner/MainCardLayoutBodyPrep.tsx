// MainCardLayoutBodyPrep.tsx
import { MainCardType } from "@/interfaces/ui/mainCard/MainCard";
import { Box } from "@mui/material";
import React from "react";

const MainCardLayoutBodyPrep: React.FC<MainCardType> = ({ children, sx }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        direction: "rtl",
        ...sx,
      }}
    >
      <Box
        sx={{
          width: "2000px", // ابعاد ثابت، بسته به نیاز قابل تغییر
          height: "1500px",
          position: "relative", // برای قراردهی absolute آیکون‌ها
          direction: "ltr",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainCardLayoutBodyPrep;
