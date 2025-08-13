import { Device } from "@/interfaces/user/layout/layoutBodyPrep";
import { paramNameMap } from "@/utils/refinedData/refinedData";

/**
 * Generates a rich, styled HTML tooltip content for device status display
 * with RTL (right-to-left) support and proper icon positioning.
 * 
 * Features:
 * - Status-specific color schemes with subtle gradients
 * - Contextual icons positioned after text (RTL-friendly)
 * - Responsive design with max-width constraint
 * - Clear visual hierarchy with proper spacing
 * - Accessibility-focused contrast ratios
 *
 * Behavior by status:
 * - Blue (normal): Shows all parameters with operation time
 * - Red (warning): Displays only temperature parameters with downtime
 * - Grey (disconnected): Connection loss indication
 * - None (unknown): Default unknown status
 *
 * @param {Device} device - Device object containing:
 *   - status: string ("blue", "red", "grey", "none")
 *   - defaultParams: Record<string, string|number> - Device parameters
 *   - operatingTime: string - Formatted duration string
 * @returns {string} HTML string for tooltip content
 *
 * @example
 * // Returns blue status tooltip with parameters
 * tooltipTitle({
 *   status: "blue",
 *   defaultParams: { temperature: "25°C", humidity: "45%" },
 *   operatingTime: "3h 15m"
 * });
 */
export const tooltipTitle = (device: Device): string => {
  const paramEntries = Object.entries(device.defaultParams || {});

  /**
   * Checks if parameter key is temperature-related
   * @param {string} key - Parameter key to test
   * @returns {boolean} True if key contains temperature reference
   */
  const isTemperatureParam = (key: string): boolean => {
    const lowerKey = key.toLowerCase();
    return lowerKey.includes('temperature');
  };

  const isSoilSurfaceParam = (key: string): boolean => {
    const lowerKey = key.toLowerCase();
    return lowerKey.includes('soilsurface');
  };

  // Base styling for all tooltips
  const baseStyle = `
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 13px;
    line-height: 1.5;
    max-width: 280px;
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    direction: rtl; /* RTL support for Persian text */
  `;

  // Status-specific styles with gradients
  const statusStyles = {
    blue: `
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      color: #0369a1;
      border: 1px solid #bae6fd;
    `,
    red: `
      background: linear-gradient(135deg, #fff0f0 0%, #fee2e2 100%);
      color: #b91c1c;
      border: 1px solid #fecaca;
    `,
    none: `
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      color: #64748b;
      border: 1px solid #e2e8f0;
    `,
    grey: `
      background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
      color: #4b5563;
      border: 1px solid #d1d5db;
    `
  };

  // Status icons (positioned after text with RTL support)
  const statusIcons = {
    blue: `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0369a1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    `,
    red: `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    `,
    none: `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
      </svg>
    `,
    grey: `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px;">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    `
  };

  /**
   * Creates tooltip header with icon positioned after text (RTL)
   * @param {string} title - Header text
   * @param {string} icon - SVG icon markup
   * @returns {string} HTML string for header
   */
  const createHeader = (title: string, icon: string) => `
    <div style="
      display: flex;
      align-items: center;
      justify-content: flex-start; /* Right alignment for RTL */
      margin-bottom: 8px;
      font-weight: 600;
    ">
      ${icon}
      ${title}
    </div>
  `;

  /**
   * Creates a parameter row with label-value pair
   * @param {string} label - Parameter name
   * @param {string|number} value - Parameter value
   * @returns {string} HTML string for parameter row
   */
  const createParamItem = (label: string, value: string | number) => `
    <div style="
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    ">
      <span style="opacity: 0.8;">${label}:</span>
      <span style="font-weight: 500;">${value}</span>
    </div>
  `;

  /**
   * Creates operating time section with conditional styling
   * @param {string} time - Formatted time string
   * @param {boolean} [isRed=false] - Whether in warning state
   * @returns {string} HTML string for time section
   */
  const createOperatingTime = (time: string, isRed: boolean = false) => `
    <div style="
      margin-top: 12px;
      padding-top: 8px;
      border-top: 1px dashed ${isRed ? 'rgba(185, 28, 28, 0.2)' : 'rgba(3, 105, 161, 0.2)'};
      display: flex;
      align-items: center;
      justify-content: flex-end; /* Right alignment for RTL */
      gap: 6px;
      font-size: 12px;
    ">
      ${isRed ? 'زمان خاموش بودن دستگاه:' : 'زمان کارکرد دستگاه:'} ${time}
    </div>
  `;

  // Status-based rendering
  switch (device.status) {
    case "blue":
      const paramsHTML = paramEntries
        .map(([key, value]) => createParamItem(paramNameMap[key] || key, value))
        .join("");

      const operatingTimeHTML = device.operatingTime
        ? createOperatingTime(device.operatingTime)
        : "";

      return `
        <div style="${baseStyle} ${statusStyles.blue}">
          ${createHeader('وضعیت دستگاه', statusIcons.blue)}
          ${paramsHTML}
          ${operatingTimeHTML}
        </div>
      `;

    case "red":
      const temperatureParams = paramEntries
        .filter(([key]) => isTemperatureParam(key))
        .map(([key, value]) => createParamItem(paramNameMap[key] || key, value))
        .join("");

      const sufaceParams = paramEntries
        .filter(([key]) => isSoilSurfaceParam(key))
        .map(([key, value]) => createParamItem(paramNameMap[key] || key, value))
        .join("");

      const redOperatingTimeHTML = device.operatingTime
        ? createOperatingTime(device.operatingTime, true)
        : "";

      return `
        <div style="${baseStyle} ${statusStyles.red}">
          ${createHeader('دستگاه خاموش است', statusIcons.red)}
          ${temperatureParams}
          ${sufaceParams}
          ${redOperatingTimeHTML}
        </div>
      `;

    case "none":
      return `
        <div style="${baseStyle} ${statusStyles.none}">
          ${createHeader('وضعیت نامشخص', statusIcons.none)}
        </div>
      `;

    case "grey":
      return `
        <div style="${baseStyle} ${statusStyles.grey}">
          ${createHeader('قطع ارتباط', statusIcons.grey)}
        </div>
      `;

    default:
      return "";
  }
};