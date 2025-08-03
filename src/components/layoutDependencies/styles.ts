import { SxProps } from "@mui/material";

type Orientation = "horizontal" | "vertical" | string;
type Position = "top" | "bottom" | "left" | "right" | "both" | "center" | string;

export const styles = {
  getContainerStyle: (
    position: Position,
    orientation: Orientation,
    iconHeight: number,
    iconWidth: number,
    lightSize: number,
    margin: number
  ): SxProps => ({
    position: "absolute",
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
    }),
    ...(position === "top" && orientation === "horizontal" && {
      top: -lightSize - margin,
      left: "50%",
      transform: "translateX(-50%)",
    }),
    ...(position === "bottom" && orientation === "vertical" && {
      top: lightSize,
      left: "50%",
      transform: "translateX(-50%)",
    }),
    ...(position === "bottom" && orientation === "horizontal" && {
      top: lightSize,
      left: "50%",
      transform: "translateX(-50%)",
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
  }),

  getTimerStyle: (
    position: Position,
    orientation: Orientation,
    iconSize: number,
    iconHeight: number,
    iconWidth: number,
    lightSize: number,
    margin: number,
    status: string
  ): SxProps => ({
    display: status === "grey" ? "block" : "none",
    position: "absolute",
    fontSize: iconSize * 1.5,
    color: "grey",
    zIndex: 10,
    ...(position === "top" && {
      top: -lightSize,
      left: "50%",
      transform: "translateX(-50%)",
    }),
    ...(position === "bottom" && orientation === "vertical" && {
      top: lightSize * 3 + margin * 3,
      left: "50%",
      transform: "translateX(-50%)",
    }),
    ...(position === "bottom" && orientation === "horizontal" && {
      top: lightSize * 2 + margin * 2.5,
      left: "50%",
      transform: "translateX(-50%)",
    }),
    ...(position === "bottom" &&
      orientation !== "vertical" &&
      orientation !== "horizontal" && {
        top: lightSize * 2 + margin * 2,
        left: "50%",
        transform: "translateX(-50%)",
      }),
    ...(position === "left" && orientation === "vertical" && {
      left: -lightSize * 1.2 - margin,
      transform: "translateY(38%)",
    }),
    ...(position === "left" && orientation !== "vertical" && {
      left: -lightSize * 3 - margin * 2,
      top: "50%",
      transform: "translateY(-50%)",
    }),
    ...(position === "right" && orientation === "horizontal" && {
      right: -lightSize * 3 - margin * 3,
      top: "50%",
      transform: "translateY(-50%)",
      left: "auto",
    }),
    ...(position === "right" && orientation !== "horizontal" && {
      right: -lightSize * 1.2 - margin,
      top: "50%",
      transform: "translateY(78%)",
    }),
    ...(position === "both" && {
      top: -lightSize * 2 - margin * 2,
      left: -lightSize * 2 - margin * 2,
      transform: "none",
    }),
    ...(position === "center" && {
      top: iconHeight / 2 + lightSize + margin,
      left: iconWidth / 2,
      transform: "translate(-50%, 0%)",
    }),
  }),

  getWarningIconStyle: (
    position: Position,
    lightSize: number
  ): SxProps => ({
    position: "absolute",
    ...(position === "top" && {
      top: -lightSize * 1.3,
      left: "50%",
      transform: "translateX(-200%)",
    }),
    ...(position === "bottom" && {
      bottom: -lightSize * 1.1,
      left: "50%",
      transform: "translateX(-50%)",
    }),
    ...(position === "left" && {
      left: -lightSize * 2.7,
      top: "50%",
      transform: "translateY(-43%)",
    }),
    ...(position === "right" && {
      right: -lightSize * 1.1,
      top: "50%",
      transform: "translateY(-50%)",
    }),
  }),
};
