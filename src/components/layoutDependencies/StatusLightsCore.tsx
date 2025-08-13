/**
 * StatusLightsCore component
 *
 * This component is responsible for rendering the core visual representation
 * of a status light, including blinking behavior, a tooltip icon, and a timer display.
 *
 * It receives computed props (like blink status, dimensions, and timer values) and
 * builds the final UI based on those values.
 */

import React from "react";
import { Box, Tooltip } from "@mui/material";
import { IconAlertCircle } from "@tabler/icons-react";
import { getLightStyle } from "./helpers";
import { styles } from "./styles";
import { StatusLightsProps } from "@/interfaces/user/layout/layoutBodyPrep";

interface Props extends StatusLightsProps {
  /** Determines if the light should be blinking */
  blink: boolean;

  /** Duration timer showing how long the status has been active */
  timer: { hours: number; minutes: number; seconds: number };

  /** Explicit height of the status icon container */
  iconHeight: number;

  /** Explicit width of the status icon container */
  iconWidth: number;

  type: string;
}

/**
 * Renders the visual status light, including the colored indicator,
 * optional warning tooltip icon, and a live-updating timer.
 *
 * @param orientation - Layout orientation (horizontal/vertical)
 * @param position - The relative position of the light in its container
 * @param status - The current status type ("red", "blue", etc.)
 * @param iconSize - Base size multiplier for all internal UI elements
 * @param iconWidth - Calculated width for the icon container
 * @param iconHeight - Calculated height for the icon container
 * @param hasExtraTooltip - Whether to show an additional tooltip with alert icon
 * @param extraTooltipContent - Custom content for the tooltip
 * @param blink - Whether the light is currently blinking
 * @param timer - Object representing hours/minutes/seconds the status has been active
 * @returns JSX element rendering the status light
 */
const StatusLightsCore: React.FC<Props> = ({
  orientation,
  position,
  status,
  iconSize,
  iconWidth,
  iconHeight,
  hasExtraTooltip,
  extraTooltipContent,
  blink,
  timer,
  type
}) => {
  const lightSize = iconSize * 2;
  const margin = iconSize * 0.5;

  if (status === "none") return null;

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={styles.getContainerStyle(
          position,
          orientation,
          iconHeight,
          iconWidth,
          lightSize,
          margin
        )}
      >
        <Box sx={{ position: "relative" }}>
          <Box sx={getLightStyle(status, status, blink, lightSize)} />

          {hasExtraTooltip && (
            <Box sx={styles.getWarningIconStyle(position, lightSize)}>
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
                  style={{
                    opacity: blink ? 1 : 0,
                    transition: "opacity 0.5s",
                  }}
                />
              </Tooltip>
            </Box>
          )}

          {(status === "grey" ||
            status === "red" ||
            (status === "blue" && type === "GranuleSillo")) && (
            <Box
              sx={styles.getTimerStyle(
                position,
                orientation,
                iconSize,
                iconHeight,
                iconWidth,
                lightSize,
                margin,
                status,
                type
              )}
            >
              {`${timer.hours.toString().padStart(2, "0")}:${timer.minutes
                .toString()
                .padStart(2, "0")}:${timer.seconds
                .toString()
                .padStart(2, "0")}`}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default StatusLightsCore;
