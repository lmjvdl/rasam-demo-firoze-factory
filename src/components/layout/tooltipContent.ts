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
    if (device.status === "blue") {
      const paramEntries = Object.entries(device.defaultParams || {});
      const paramsHTML = paramEntries
        .map(([key, value]) => {
          const label = paramNameMap[key] || key;
          return `${label}: ${value}`;
        })
        .join("<br />");
  
      const operatingTimeHTML = device.operatingTime
        ? `<br /><br /><span style="display: flex; align-items: center; gap: 4px;">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15 15" />
              </svg>
              زمان کارکرد دستگاه: ${device.operatingTime}
          </span>`
        : "";
  
      return paramsHTML + operatingTimeHTML;
    } else if (device.status === "red") {
      return `مدت زمان خاموش بودن دستگاه: ${device.startTime || "00:00:00"}`;
    } else if (device.status === "none") {
      return "وضعیت نامشخص";
    }
  
    return "";
  };
  