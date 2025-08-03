/**
 * StatusLights component
 *
 * This is a wrapper component that handles the dynamic behavior (blinking effect and fault timing)
 * for status indicators and passes the computed values to the core visual component `StatusLightsCore`.
 *
 * It calculates default sizes for the icons if not explicitly provided and manages visual effects via hooks.
 */

import React from "react";
import { StatusLightsProps } from "@/interfaces/user/layout/layoutBodyPrep";
import { useBlink } from "./useBlink";
import { useFaultTimer } from "./useFaultTimer";
import StatusLightsCore from "./StatusLightsCore";

/**
 * Renders a status light component with blinking and timer logic.
 *
 * @param props - The props for the status lights, including configuration for size, status, and optional overrides.
 * @returns A JSX element displaying the core status lights component with enhanced behavior.
 */
const StatusLights: React.FC<StatusLightsProps> = (props) => {
  // Hook to determine if the light should blink (usually toggled at an interval)
  const blink = useBlink();

  // Hook to compute how long the current fault status has been active
  const timer = useFaultTimer(props.status, props.startTime);

  // Provide fallback sizes if iconWidth or iconHeight are not explicitly passed
  const iconHeight = props.iconHeight ?? props.iconSize * 20;
  const iconWidth = props.iconWidth ?? props.iconSize * 20;

  return (
    <StatusLightsCore
      {...props}
      iconHeight={iconHeight}
      iconWidth={iconWidth}
      blink={blink}
      timer={timer}
    />
  );
};

export default StatusLights;
