import React from "react";
import { Box, Tooltip } from "@mui/material";
import { Device, Position } from "@/interfaces/user/layout/layoutBodyPrep";
import StatusLights from "@/components/layoutDependencies/page";
import { iconComponents } from "@/utils/refinedData/refinedData";
import { tooltipTitle } from "./tooltipContent";
import { getIconDimensions } from "./iconConfigs";

interface DeviceRendererProps {
    device: Device;
    position: Position;
    onClick: (deviceType: string) => void;
    iconSize?: number;
}

const ICON_SIZE = 10;
export const DeviceRenderer: React.FC<DeviceRendererProps> = ({
    device,
    position,
    onClick,
    iconSize = ICON_SIZE,
}) => {
    const IconComponent = iconComponents[device.type];
    const { width, height } = getIconDimensions(device.type);

    return (
        <Tooltip
            arrow
            title={
                <Box
                    sx={{
                        fontSize: 12,
                        lineHeight: 1.7,
                        maxWidth: 300,
                        whiteSpace: "normal",
                        padding: 1,
                    }}
                    dangerouslySetInnerHTML={{ __html: tooltipTitle(device) }}
                />
            }
            placement="bottom"
            PopperProps={{
                modifiers: [
                    {
                        name: "offset",
                        options: {
                            offset: [width * iconSize / 20, -(height * iconSize) / 2],
                        },
                    },
                    {
                        name: "preventOverflow",
                        options: {
                            padding: 8,
                        },
                    },
                    {
                        name: "arrow",
                        options: {
                            padding: 10,
                        },
                    },
                ],
            }}
            sx={{ zIndex: 1300 }}
        >

            <Box
                dir="ltr"
                sx={{ position: "absolute", ...position, cursor: "pointer" }}
                onClick={() => onClick(device.type)}
            >
                <Box sx={{ position: "relative", display: "inline-block" }}>
                    <StatusLights
                        orientation={device.lightsConfig.orientation}
                        position={device.lightsConfig.position}
                        status={device.status}
                        iconSize={iconSize}
                        startTime={device.startTime}
                        iconWidth={width * iconSize}
                        iconHeight={height * iconSize}
                        hasExtraTooltip={!!device.extraTooltip}
                        extraTooltipContent={device.extraTooltip}
                    />
                    <IconComponent width={width * iconSize} height={height * iconSize} />
                </Box>
            </Box>
        </Tooltip>
    );
};