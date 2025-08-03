import { useEffect, useState } from "react";
import { parseStartTime } from "./helpers";

/**
 * Custom React hook to track elapsed time since a given start time when the status is "grey".
 *
 * This hook returns a timer object with hours, minutes, and seconds counting up from the parsed start time.
 * The timer resets to zero whenever the status changes to anything other than "grey".
 * The timer increments every second.
 *
 * @param {string} status - The current status string that controls whether the timer runs.
 *                          The timer runs only when status is exactly "grey".
 * @param {string | undefined} startTime - An optional start time string to initialize the timer.
 *                                         It is parsed by `parseStartTime` to get the initial time.
 *
 * @returns {{hours: number, minutes: number, seconds: number}} timer - The elapsed time since startTime,
 *                                                                      or zero if status is not "grey".
 *
 * @example
 * const timer = useFaultTimer("grey", "00:10:00");
 * // timer will start counting up from 00:10:00 while status is "grey"
 *
 * This hook is useful for showing how long a fault or warning condition has persisted.
 */
export const useFaultTimer = (status: string, startTime?: string) => {
  // The useFaultTimer hook manages a timer that increments every second starting from a given start time.
  // It only runs while the status equals "grey". On status changes to any other value, the timer resets.
  // The timer state is updated every second using setInterval, and cleanup is performed on unmount or status/startTime changes.
  // It returns an object representing elapsed time in hours, minutes, and seconds.
  // Useful in UI components that need to display the duration of a fault or alert condition.

  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (status !== "grey") {
      // Reset timer if status is not "grey"
      setTimer({ hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    // Initialize timer from the parsed start time
    setTimer(parseStartTime(startTime));

    // Increment timer every second
    const interval = setInterval(() => {
      setTimer((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds++;
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

    // Cleanup interval on unmount or when status/startTime changes
    return () => clearInterval(interval);
  }, [status, startTime]);

  return timer;
};
