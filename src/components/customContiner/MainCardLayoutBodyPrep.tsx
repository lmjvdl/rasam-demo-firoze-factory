"use client";

import { MainCardType } from "@/interfaces/ui/mainCard/MainCard";
import { Box } from "@mui/material";
import React from "react";

const MainCardLayoutBodyPrep: React.FC<MainCardType> = ({ children }) => {
  const baseWidth = 1000;
  const baseHeight = 1700;

  const [windowSize, setWindowSize] = React.useState({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const updateSize = () =>
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  const scaleX = windowSize.width / baseWidth;
  const scaleY = windowSize.height / baseHeight;
  const scale = Math.max(1, Math.min(scaleX, scaleY));

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        position: "relative",
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          width: `${baseWidth * scale}px`,
          height: `${baseHeight * scale}px`,
          position: "relative",
        }}
      >
        <Box
          sx={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${baseWidth}px`,
            height: `${baseHeight}px`,
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            direction: "ltr",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainCardLayoutBodyPrep;
