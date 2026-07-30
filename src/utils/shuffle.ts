/**
 * Fisher–Yates shuffle – returns a new array, does not mutate the input.
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
