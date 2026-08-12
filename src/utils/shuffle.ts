/**
 * Provides immutable randomization helpers for game collections.
 */

/**
 * Produces a randomized copy using the Fisher–Yates algorithm.
 *
 * @typeParam T - Type of element being shuffled.
 * @param items - Source collection, which remains unchanged.
 * @returns A new array containing the source elements in random order.
 */
export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = result[index];
    result[index] = result[swapIndex] as T;
    result[swapIndex] = current as T;
  }

  return result;
}
