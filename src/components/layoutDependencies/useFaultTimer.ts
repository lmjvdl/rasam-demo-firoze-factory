import { useEffect, useState } from "react";
import { parseStartTime } from "./helpers";

type TimerStatus = "grey" | "red" | "none" | "blue";
type Timer = {
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * Custom React hook to track elapsed time when status is "grey" or "red".
 * 
 * The timer starts counting from the provided startTime (parsed as HH:MM:SS)
 * and increments every second while the status remains "grey" or "red".
 * Resets to zero when status changes to any other value.
 * 
 * @param {TimerStatus} status - Determines if timer should run ("grey" or "red")
 * @param {string | undefined} startTime - Optional initial time string (format: "HH:MM:SS")
 * @returns {Timer} Object containing current hours, minutes, and seconds
 * 
 * @example
 * // Timer counts up from 10:00 while status is "grey"
 * const { hours, minutes, seconds } = useFaultTimer("grey", "10:00:00");
 * 
 * @example
 * // Timer resets to 00:00:00 when status changes to "green"
 * const timer = useFaultTimer("green", "05:30:00");
 */
export const useFaultTimer = (status: TimerStatus, startTime?: string, deviceType?: string): Timer => {
  const [timer, setTimer] = useState<Timer>({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const shouldRunTimer =
      status === "grey" ||
      status === "red" ||
      (status === "blue" && deviceType === "GranuleSillo");

    if (!shouldRunTimer) {
      setTimer({ hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    setTimer(parseStartTime(startTime));

    const intervalId = setInterval(() => {
      setTimer(prev => {
        let seconds = prev.seconds + 1;
        let minutes = prev.minutes;
        let hours = prev.hours;

        if (seconds >= 60) {
          seconds = 0;
          minutes++;
        }
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [status, startTime, deviceType]);

  return timer;
};