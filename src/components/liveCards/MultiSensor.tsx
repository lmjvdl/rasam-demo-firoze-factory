"use client"

import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  useTheme,
  Paper,
  Tooltip,
  styled,
} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OnOff from "./dependenciesLiveCards/OnOff";
import { MultiSensorLiveSchema } from "@/interfaces/lives/multiSensor";
import OnOffGranuleSillos from "./dependenciesLiveCards/OnOffGranolSillos";
import { useEffect, useState } from "react";
import { IconAlertCircle } from "@tabler/icons-react";

interface Props {
  container: MultiSensorLiveSchema;
}

/**
 * MultiSensorLiveCard component renders a card displaying live data from a multisensor device.
 * The card visually indicates the device's connectivity status using color and shadow:
 * - Online ("on"): primary color with a glowing shadow.
 * - Disconnected ("disconnect") or None ("none"): warning color with a distinct shadow.
 * - Offline or other states: error color with a subdued shadow and disabled background.
 *
 * The component also displays various sensor attributes if available in the data,
 * and shows an appropriate device status indicator.
 *
 * @param {Props} props - The properties object containing the multisensor container data.
 * @returns {JSX.Element} The rendered live data card component.
 */
export default function MultiSensorLiveCard({ container }: Props) {
  const theme = useTheme();
  const safeData = container.data || {};

  // One Attribute for handling extra tooltip ans show warning in card
  const [hasWarning, setHasWarning] = useState<boolean>(false);

  useEffect(() => {
    if (container.data?.extraTooltip) {
      setHasWarning(true);
    }
  }, [container.data?.extraTooltip]); // Only re-run if extraTooltip changes

  /**
   * Checks if a specific attribute exists in the sensor data.
   * @param {string} attr - The attribute key to check in the data object.
   * @returns {boolean} True if attribute exists; false otherwise.
   */
  function hasAttribute(attr: string): boolean {
    return attr in safeData;
  }

  /**
   * Extracts the silo number from the device code string, if it matches the pattern "سیلو X".
   * @param {string} code - The device code string.
   * @returns {number | null} The silo number or null if not matched.
   */
  function getSiloNumber(code: string): number | null {
    const match = code.match(/^سیلو (\d{1,2})$/);
    return match ? parseInt(match[1], 10) : null;
  }

  /**
   * Renders a labeled attribute row with its value and unit if the attribute exists in the data.
   * @template K
   * @param {string} label - The label text for the attribute.
   * @param {K} attr - The key of the attribute in the data object.
   * @param {string} [unit=""] - Optional unit string to append to the value.
   * @returns {React.ReactNode} A Paper component displaying the attribute, or null if attribute missing.
   */
  function renderAttribute<K extends keyof typeof safeData>(
    label: string,
    attr: K,
    unit: string = ""
  ): React.ReactNode {
    return (
      hasAttribute(attr) && (
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            boxShadow: 1,
          }}
        >
          <Typography variant="body2" color="text.primary">
            {label}
          </Typography>

          {safeData[attr] !== undefined && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="body1" fontWeight="bold" color="text.primary">
                {unit}
              </Typography>
              <Typography variant="body1" fontWeight="bold" color="text.primary">
                {safeData[attr]}
              </Typography>
            </Box>
          )}
        </Paper>
      )
    );
  }

  const BlinkingIcon = styled(IconAlertCircle)({
    animation: 'blink 1.5s infinite',
    '@keyframes blink': {
      '0%': { opacity: 1 },
      '50%': { opacity: 0.1 },
      '100%': { opacity: 1 }
    }
  });

  // Determine the silo number from device code
  const siloNumber = getSiloNumber(container.device_code);

  // Connectivity status string from the container object
  const status = container.online; // expected values: "on", "disconnect", "none", or others

  // Define dynamic styles for card background color and box shadow based on status
  let boxShadow: string;

  if (status === "on") {
    // Online state: primary color glow and default background
    boxShadow = `0 0 8px 2px ${theme.palette.primary.main}66`;
  } else if (status === "disconnect" || status === "none") {
    // Disconnected or none state: warning color glow with light grey background
    boxShadow = `0 0 8px 2px ${theme.palette.warning.main}66`;
  } else {
    // Offline or other states: error color glow with disabled background
    boxShadow = `0 0 8px 2px ${theme.palette.error.main}33`;
  }

  return (
    <Box sx={{ padding: 1, boxSizing: "border-box", margin: 1 }}>
      <Card
        sx={{
          boxShadow,
          height: "100%",
          borderRadius: 3,
          backgroundColor: `${theme.palette.primary.main}800`,
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Box display="flex" alignItems="center" gap={1}>
              {hasWarning && (
                <Tooltip
                  title={container.data.extraTooltip || ''}
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: '#FFA000',
                        color: theme.palette.getContrastText('#FFA000'),
                        fontSize: theme.typography.pxToRem(14),
                        maxWidth: 300,
                      }
                    },
                    arrow: {
                      sx: {
                        color: '#FFA000',
                      }
                    }
                  }}
                >
                  <BlinkingIcon
                    size={40}
                    color="#FFA000"
                    sx={{ cursor: 'pointer' }}
                  />
                </Tooltip>
              )}

              <Typography variant="h6" fontWeight="bold" noWrap>
                {container.device_code}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.3,
                backgroundColor: theme.palette.background.default,
                padding: "2px 6px",
                borderRadius: 2,
                boxShadow: boxShadow,
                userSelect: "none",
                fontFamily: "'Roboto Mono', monospace",
                minWidth: 60,
                justifyContent: "center",
              }}
              aria-label="live timer"
              title="Device running time"
            >
              <AccessTimeIcon
                fontSize="inherit"
                sx={{
                  color: boxShadow,
                }}
              />
              <Typography
                variant="caption"
                fontWeight="bold"
                sx={{
                  color: boxShadow,
                  letterSpacing: "0.1em",
                  ml: 0.2,
                }}
              >
                {container.data.time}
              </Typography>
            </Box>

            {/* Render silo indicator if silo number is valid; otherwise generic OnOff indicator */}
            {siloNumber && siloNumber >= 1 && siloNumber <= 12 ? (
              <OnOffGranuleSillos on={status} index={siloNumber} />
            ) : (
              <OnOff on={status} />
            )}
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box display="flex" flexDirection="column" gap={1}>
            {renderAttribute("جریان دستگاه", "current", " A")}
            {renderAttribute("دمای موتور", "temperature", " C°")}
            {renderAttribute("سطح خاک", "soilSurface", " m")}
            {renderAttribute("وزن خاک ورودی", "WeightIncomingSoil", " kg/h")}
            {renderAttribute("وزن آب ورودی", "OutputSoilWeight", " kg/h")}
            {renderAttribute("دمای مشعل", "BurnerTemperature", " C°")}
            {renderAttribute("دمای خروجی", "OutletTemperature", " C°")}
            {renderAttribute("دبی وزنی گرانول", "OutputGranuleWeight", " kg/h")}
            {renderAttribute("دمای گرانول خروجی", "OutputGranuleTemperature", " C°")}
            {renderAttribute("رطوبت گرانول خروجی", "OutputGranuleMoisture", " %")}
            {renderAttribute("وزن خاک ورودی", "WeightSoilEnteringbatchMill", " kg")}
            {renderAttribute("حجم آب ورودی", "WeightIncomingWaterMilliliters", " L")}
            {renderAttribute("دبی پمپ", "FlowRate", " m³/h")}
            {renderAttribute("دمای موتور راست", "rightEngineTemperature", " C°")}
            {renderAttribute("جریان موتور راست", "rightEngineCurrent", " A")}
            {renderAttribute("دمای موتور چپ", "leftEngineTemperature", " C°")}
            {renderAttribute("جریان موتور چپ", "leftEngineCurrent", " A")}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
