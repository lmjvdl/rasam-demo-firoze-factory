import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

interface StatusLightsProps {
  orientation: "horizontal" | "vertical";
  position: "top" | "bottom" | "left" | "right" | "both";
  status: "green" | "red" | "grey";
  iconSize: number;
}

const StatusLights: React.FC<StatusLightsProps> = ({
  orientation,
  position,
  status,
  iconSize,
}) => {
  const [blink, setBlink] = useState(true);
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Blinking effect for active light
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Timer for grey (faulty) state
  useEffect(() => {
    if (status !== "grey") {
      setTimer({ hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds++;
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
        }
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  const lightSize = iconSize * 2;
  const margin = iconSize * 0.5;

  const getLightStyle = (lightStatus: string) => ({
    width: lightSize,
    height: lightSize,
    borderRadius: "50%",
    border: `1px solid ${
      lightStatus === "green"
        ? "#4CAF50"
        : lightStatus === "red"
        ? "#F44336"
        : "#9E9E9E"
    }`,
    backgroundColor:
      status === lightStatus && blink
        ? lightStatus === "green"
          ? "#4CAF50"
          : lightStatus === "red"
          ? "#F44336"
          : "#9E9E9E"
        : "transparent",
    transition: "background-color 0.5s",
  });

  const containerStyle = {
    display: "flex",
    flexDirection: orientation === "horizontal" ? "row" : "column",
    gap: 1, // Fixed 2px gap between lights
    position: "absolute" as const,
    ...(position === "top" && {
      top: -lightSize - margin,
      left: "50%",
      transform: "translateX(-50%)",
    }),
    ...(position === "bottom" && {
      bottom: -lightSize - margin,
      left: "50%",
      transform: "translateX(-50%)",
    }),
    ...(position === "left" && {
      left: -lightSize - margin,
      top: "50%",
      transform: "translateY(-50%)",
    }),
    ...(position === "right" && {
      right: -lightSize - margin,
      top: "50%",
      transform: "translateY(-50%)",
    }),
    ...(position === "both" && {
      top: -lightSize - margin,
      left: -lightSize - margin,
    }),
  };

  const timerStyle = {
    display: status === "grey" ? "block" : "none",
    position: "absolute" as const,
    fontSize: iconSize * 1.5,
    color: "#9E9E9E",
    ...(position === "top" && {
      top: -lightSize * 2 - margin * 2,
      left: "50%",
      transform: "translateX(-50%)",
    }),
    ...(position === "bottom" && {
      bottom: -lightSize * 2 - margin * 2,
      left: "50%",
      transform: "translateX(-50%)",
    }),
    ...(position === "left" && {
      left: -lightSize * 3 - margin * 2,
      top: "50%",
      transform: "translateY(-50%)",
    }),
    ...(position === "right" && {
      right: -lightSize * 3 - margin * 2,
      top: "50%",
      transform: "translateY(-50%)",
    }),
    ...(position === "both" && {
      top: -lightSize * 2 - margin * 2,
      left: -lightSize * 2 - margin * 2,
    }),
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={containerStyle}>
        <Box sx={getLightStyle("green")} />
        <Box sx={getLightStyle("red")} />
        <Box sx={getLightStyle("grey")} />
      </Box>
      <Box sx={timerStyle}>
        {`${timer.hours.toString().padStart(2, "0")}:${timer.minutes
          .toString()
          .padStart(2, "0")}:${timer.seconds.toString().padStart(2, "0")}`}
      </Box>
    </Box>
  );
};

export default StatusLights;