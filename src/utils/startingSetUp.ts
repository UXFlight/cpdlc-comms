/* eslint-disable @typescript-eslint/no-explicit-any */
export function startingSetUp(data: any) {
  return {
    dataAuthority: {
      current: data.CDA,
      next: data.NDA,
    },
    flightInfo: {
      flightId: data.flight_id,
      departureAirport: data.departure,
      arrivalAirport: data.arrival,
    },
    status: { ...data.status },
    route: data.route || [],
    currentFixIndex: 0,
  };
}
