import { use, useContext } from "react";
import { RequestCategory, RequestState } from "../interfaces/Request";
import { RequestContext } from "../context/RequestContext";

export function resolveMessageRef(category: RequestCategory, request: RequestState): string | null {
  const argCount = request.arguments?.length || 0;
  const hasTime = !!request.timeSelected;
  const hasPosition = !!request.positionSelected;

  switch (category) {
    case RequestCategory.ALTITUDE:
      if (argCount === 1 && !hasTime && !hasPosition) return "DM9";
      if (argCount === 2 && !hasTime && !hasPosition) return "DM7";
      if (argCount === 1 && hasPosition && !hasTime) return "DM11";
      if (argCount === 1 && hasTime && !hasPosition) return "DM13";
      break;

    case RequestCategory.OFFSET:
      if (argCount === 1 && !hasTime && !hasPosition) return "DM15";
      if (argCount === 1 && hasTime && !hasPosition) return "DM17";
      if (argCount === 1 && hasPosition && !hasTime) return "DM16";
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

  return null; // si aucun cas ne matche
}
  