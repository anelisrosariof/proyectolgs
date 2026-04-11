export function getOccupancyPercent(sold: number, capacity: number) {
  return Math.round((sold / capacity) * 100);
}