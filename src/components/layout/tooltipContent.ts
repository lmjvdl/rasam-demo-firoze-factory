import { Device } from "@/interfaces/user/layout/layoutBodyPrep";
import { paramNameMap } from "@/utils/refinedData/refinedData";

export const tooltipTitle = (device: Device) => {
    if (device.status === "blue") {
        const paramEntries = Object.entries(device.defaultParams || {});
        const paramText = paramEntries
            .map(([key, value]) => {
                const label = paramNameMap[key] || key;
                return `${label}: ${value}`;
            })
            .join(" | ");

        const extraText = device.extraTooltip ? `\n ~~~ ${device.extraTooltip}` : "";
        return `${paramText}${extraText}`;
    } else if (device.status === "red") {
        return `مدت زمان خاموش بودن دستگاه: ${device.startTime || "00:00:00"}`;
    } else if (device.status === "grey") {
        return `مدت زمان قطع ارتباط: ${device.startTime || "00:00:00"}`;
    } else {
        return device.extraTooltip || "وضعیت نامشخص";
    }
};