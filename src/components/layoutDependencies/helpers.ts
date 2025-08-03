/**
 * Parses a time string in "HH:mm:ss" format into an object with hours, minutes, and seconds.
 *
 * @param time - A string representing time, e.g., "01:30:45".
 * @returns An object containing numeric values for hours, minutes, and seconds.
 *          If input is invalid or undefined, returns all zeros.
 */
export const parseStartTime = (time?: string) => {
    if (!time) return { hours: 0, minutes: 0, seconds: 0 };

    // Split the time string into components and convert each to number
    const [hours, minutes, seconds] = time.split(":").map(Number);

    return {
        hours: isNaN(hours) ? 0 : hours,
        minutes: isNaN(minutes) ? 0 : minutes,
        seconds: isNaN(seconds) ? 0 : seconds,
    };
};


/**
 * Returns style configuration for a status light circle (blue, red, or grey),
 * including blinking animation and color styling.
 *
 * @param status - The current active status (e.g., "blue", "red", "grey").
 * @param lightStatus - The status for which the light is being rendered.
 * @param blink - Whether the light is currently blinking or off (used in animation).
 * @param lightSize - The diameter of the light circle in pixels.
 * @returns A style object compatible with the `sx` prop in MUI.
 */
export const getLightStyle = (
    status: string,
    lightStatus: string,
    blink: boolean,
    lightSize: number
) => ({
    width: lightSize,
    height: lightSize,
    borderRadius: "50%",

    // Outline color based on the light's status
    border: `1px solid ${
        lightStatus === "blue"
            ? "#2196F3"
            : lightStatus === "red"
                ? "#F44336"
                : "#9E9E9E"
    }`,

    // Background only filled when status is active and blinking
    backgroundColor:
        status === lightStatus && blink
            ? lightStatus === "blue"
                ? "#2196F3"
                : lightStatus === "red"
                    ? "#F44336"
                    : "#9E9E9E"
            : "transparent",

    // Smooth blinking transition
    transition: "background-color 0.5s",
});
