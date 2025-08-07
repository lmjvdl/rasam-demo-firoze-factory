/**
 * Starts a recurring random number generator that emits a formatted string every 2 seconds.
 *
 * The function generates a random floating-point number between `start_number` and `end_number`,
 * rounds it to one decimal place, appends the specified `unit` with a space, and passes the result
 * to the provided `callback` function.
 *
 * This is useful for simulating live sensor data, animated values, or periodic updates.
 *
 * @param start_number - The lower bound of the random number range (inclusive).
 * @param end_number - The upper bound of the random number range (exclusive).
 * @param unit - A string unit (e.g., "A", "C°") to append to the number.
 * @param callback - A function that receives the generated string every 2 seconds.
 * @returns A cleanup function that stops the interval when called.
 *
 * @example
 * const stop = startRandomGenerator(5, 10, 'kg', (value) => {
 *   console.log(value); // Example output: "7.3 kg/h"
 * });
 *
 * // To stop the generator later:
 * stop();
 */

export default function startRandomGenerator(
  min: number,
  max: number,
  unit: string = "",
  callback: (value: string) => void
): () => void {
  const interval = setInterval(() => {
    const randomValue = (Math.random() * (max - min) + min).toFixed(2);
    callback(`${randomValue}${unit}`);
  }, 2000);

  // return a function to stop the generator
  return () => {
    clearInterval(interval);
  };
}
