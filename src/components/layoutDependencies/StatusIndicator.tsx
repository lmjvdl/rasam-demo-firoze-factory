import React, { useEffect, useState } from "react";
import { Box, Tooltip } from "@mui/material";
import { StatusLightsProps } from "@/interfaces/user/layout/layoutBodyPrep";
import { IconAlertCircle } from "@tabler/icons-react";


const StatusLights: React.FC<StatusLightsProps> = ({
  orientation,
  position,
  status,
  iconSize,
  iconWidth = iconSize * 20,
  iconHeight = iconSize * 20,
  hasExtraTooltip,
  extraTooltipContent
}) => {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (status === "none") return null;

  const lightSize = iconSize * 2;
  const margin = iconSize * 0.5;

  const getLightStyle = (lightStatus: string) => ({
    width: lightSize,
    height: lightSize,
    borderRadius: "50%",
    border: `1px solid ${lightStatus === "blue"
      ? "#2196F3"
      : lightStatus === "red"
        ? "#F44336"
        : "#9E9E9E"
      }`,
    backgroundColor:
      status === lightStatus && blink
        ? lightStatus === "blue"
          ? "#2196F3"
          : lightStatus === "red"
            ? "#F44336"
            : "#9E9E9E"
        : "transparent",
    transition: "background-color 0.5s",
  });

  const containerStyle = {
    position: "absolute" as const,
    top: "-100%",
    transform: "translate(-10%, -50%)",
    display: "flex",
    flexDirection: orientation === "horizontal" ? "row" : "column",
    gap: 1,
    zIndex: 10,
    ...(position === "top" && orientation === "vertical" && {
      top: -lightSize,
      left: "50%",
      transform: "translateX(-50%)",
      right: "auto",
      bottom: "auto",
    }),
    ...(position === "top" && orientation === "horizontal" && {
      top: -lightSize - margin,
      left: "50%",
      transform: "translateX(-50%)",
      right: "auto",
      bottom: "auto",
    }),
    ...(position === "bottom" && orientation === "vertical" && {
      top: lightSize,
      left: "50%",
      transform: "translateX(-50%)",
      right: "auto",
      bottom: "auto",
    }),
    ...(position === "bottom" && orientation === "horizontal" && {
      top: lightSize,
      left: "50%",
      transform: "translateX(-50%)",
      right: "auto",
      bottom: "auto",
    }),
    ...(position === "bottom" &&
      orientation !== "vertical" &&
      orientation !== "horizontal" && {
      top: lightSize + margin,
      left: "50%",
      transform: "translateX(-50%)",
    }),
    ...(position === "left" && orientation === "vertical" && {
      left: -lightSize,
      top: "100%",
      transform: "translateY(270%)",
    }),
    ...(position === "left" && orientation !== "vertical" && {
      left: -lightSize,
      top: "50%",
      transform: "translateY(-50%)",
    }),
    ...(position === "right" && orientation === "horizontal" && {
      right: -lightSize - margin,
      top: "0%",
      transform: "translateY(-50%)",
      left: "auto",
      bottom: "auto",
    }),
    ...(position === "right" && orientation !== "horizontal" && {
      right: -lightSize,
      top: "100%",
      transform: "translateY(270%)",
    }),
    ...(position === "both" && {
      top: -lightSize - margin,
      left: -lightSize - margin,
      transform: "none",
    }),
    ...(position === "center" && {
      top: iconHeight / 2,
      left: iconWidth / 2,
      transform: "translate(-50%, -50%)",
    }),
  };

  const warningIconStyle = {
    position: "absolute" as const,
    ...(position === "top" && { top: -lightSize * 1.3, left: "50%", transform: "translateX(-200%)" }),
    ...(position === "bottom" && { bottom: -lightSize * 1.1, left: "50%", transform: "translateX(-50%)" }),
    ...(position === "left" && { left: -lightSize * 2.7, top: "50%", transform: "translateY(-43%)" }),
    ...(position === "right" && { right: -lightSize * 1.1, top: "50%", transform: "translateY(-50%)" }),
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={containerStyle}>
        <Box sx={{ position: "relative" }}>
          <Box sx={getLightStyle(status)} />
          {hasExtraTooltip && (
            <Box sx={warningIconStyle}>
              <Tooltip
                title={
                  <span style={{ color: "#FFA000", fontWeight: "bold" }}>
                    {extraTooltipContent}
                  </span>
                }
              >
                <IconAlertCircle
                  size={iconSize * 5}
                  color="#FFA000"
                  style={{ opacity: blink ? 1 : 0, transition: "opacity 0.5s" }}
                />
              </Tooltip>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );


};

export default StatusLights;
