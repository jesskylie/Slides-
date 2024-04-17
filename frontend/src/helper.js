/**
 * Creates a random integer
 */
export function getRandomInt (min = 0, max = 1000) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
