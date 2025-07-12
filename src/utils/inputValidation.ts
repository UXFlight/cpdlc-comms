export function isValidFlightLevel(input: string): boolean {
  const match = input.match(/^fl(\d{3})$/i);
  if (!match) return false;

  const flightLevel = parseInt(match[1], 10);
  return flightLevel >= 0 && flightLevel <= 999;
}