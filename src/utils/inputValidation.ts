// validationUtils.ts
export function isValidFlightLevel(
  input: string,
  throwError?: (msg: string) => void,
): boolean {
  const match = input.match(/^fl(\d{3})$/i);

  if (!match) {
    throwError?.("Invalid altitude format. Expected something like 'FL220'.");
    return false;
  }

  const flightLevel = parseInt(match[1], 10);

  if (flightLevel < 0 || flightLevel > 999) {
    throwError?.("Flight level must be between FL000 and FL999.");
    return false;
  }

  return true;
}
