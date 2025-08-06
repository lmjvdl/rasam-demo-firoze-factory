/**
 * Converts a time string formatted as "HH:MM:SS" into total seconds.
 * @param time - Time string in the format "HH:MM:SS"
 * @returns The total time in seconds
 */
export function timeStringToSeconds(time: string): number {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Converts seconds to a time string formatted as "HH:MM:SS".
 * Pads single digit numbers with leading zeros.
 * @param seconds - Total seconds to convert
 * @returns Time string formatted as "HH:MM:SS"
 */
export function secondsToTimeString(seconds: number): string {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
}