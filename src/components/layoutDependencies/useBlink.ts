import { useEffect, useState } from "react";

/**
 * Custom React hook that toggles a boolean `blink` value at a regular interval.
 *
 * @param {number} intervalMs - The interval in milliseconds for toggling the blink value. Defaults to 1000ms.
 * 
 * @returns {boolean} blink - A boolean that alternates between `true` and `false` on each interval tick.
 *
 * @example
 * const blink = useBlink(500); // toggles every 500ms
 * return <div style={{ opacity: blink ? 1 : 0.5 }}>Blinking element</div>;
 *
 * This hook is useful for animations, warning indicators, or any visual element
 * that needs to blink periodically.
 */

export const useBlink = (intervalMs = 1000) => {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return blink;
};
