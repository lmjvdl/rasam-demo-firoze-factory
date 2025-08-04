import { Device } from "@/interfaces/user/layout/layoutBodyPrep";
import { paramNameMap } from "@/utils/refinedData/refinedData";

/**
 * Generates a dynamic HTML-formatted tooltip content string based on the device status.
 *
 * This function is used to provide context-aware tooltip text for a device component
 * in the UI. The content varies depending on the device's status:
 *
 * - If the status is `"blue"`, it returns a list of key-value pairs from the device's 
 *   `defaultParams`, each mapped to a human-readable label (using `paramNameMap`), 
 *   separated by HTML `<br />` tags for line breaks.
 *
 * - If the status is `"red"`, it returns a message indicating the device's offline duration.
 *
 * - If the status is `"none"`, it returns a default message indicating unknown status.
 *
 * If none of the statuses match, an empty string is returned.
 *
 * @param device - The device object containing status and default parameters.
 * @returns A string of HTML content to be displayed as a tooltip.
 */

export const tooltipTitle = (device: Device): string => {
    // If the device is online (status: blue), return its parameters as a formatted list.
    if (device.status === "blue") {
        const paramEntries = Object.entries(device.defaultParams || {});
        return paramEntries
            .map(([key, value]) => {
                const label = paramNameMap[key] || key;
                return `${label}: ${value}`;
            })
            .join("<br />");
    }

    // If the device is offline (status: red), show the duration it has been off.
    else if (device.status === "red") {
        return `مدت زمان خاموش بودن دستگاه: ${device.startTime || "00:00:00"}`;
    }

    // If the device status is unknown, return a default message.
    else if (device.status === "none") {
        return "وضعیت نامشخص";
    }

    // Fallback: return an empty string for any other status.
    return "";
};
