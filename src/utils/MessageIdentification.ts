import { Request } from "@/interface/Request";
import { RequestCategory } from "@/constants/tabs/Request";
import { FlightDetails } from "@/interface/FlightDetails";

export function resolveMessageRef(
  category: RequestCategory,
  request: Request,
  flightDetails?: FlightDetails,
): string | null {
  const argCount = request.arguments?.length || 0;
  const hasTime = !!request.timeSelected;
  const hasPosition = !!request.positionSelected;

  switch (category) {
    case RequestCategory.ALTITUDE:
      if (argCount === 1 && !hasTime && !hasPosition)
        return climbOrDescend(
          request.arguments[0],
          flightDetails?.status.altitude || 0,
        );
      if (argCount === 2 && !hasTime && !hasPosition) return "DM7";
      if (argCount === 1 && hasPosition && !hasTime) return "DM11";
      if (argCount === 1 && hasTime && !hasPosition) return "DM13";
      break;

    case RequestCategory.OFFSET:
      if (argCount === 2 && !hasTime && !hasPosition) return "DM15";
      if (argCount === 2 && hasTime && !hasPosition) return "DM17";
      if (argCount === 2 && hasPosition && !hasTime) return "DM16";
      break;

    case RequestCategory.SPEED:
      if (argCount === 1) return "DM18";
      if (argCount === 2) return "DM19";
      break;

    case RequestCategory.VOICE:
      if (argCount === 0) return "DM20";
      if (argCount === 1) return "DM21";
      break;

    default:
      return null;
  }

  return null;
}

export function climbOrDescend(
  input: string,
  current: number,
): "DM9" | "DM10" | "DM37" {
  const match = input.match(/fl(\d{3})/i);

  if (!match) {
    throw new Error(
      "Invalid altitude format. Expected something like 'FL220'.",
    );
  }

  const flightLevel = parseInt(match[1], 10) * 100; // fl220 => 22000

  if (flightLevel > current) return "DM9";
  if (flightLevel < current) return "DM10";
  return "DM37";
}
