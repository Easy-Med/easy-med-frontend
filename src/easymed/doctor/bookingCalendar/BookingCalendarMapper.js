export default class BookingCalendarMapper {
  static mapAvailability(fetchedEvent) {
    return {
      id: fetchedEvent.id,
      start: new Date(fetchedEvent.startDate),
      end: new Date(fetchedEvent.endDate),
      title: "Available",
    };
  }

  static mapReservedVisit(visit) {
    return {
      id: visit.id,
      start: visit.startDate,
      end: visit.endDate,
      title: "Visit",
    };
  }

  static mapForAddAvailabilityRequest(events) {
    return {
      availabilities: events.map((event) => {
        return {
          startDate: event.start.toISOString(),
          endDate: event.end.toISOString(),
        };
      }),
    };
  }
}
