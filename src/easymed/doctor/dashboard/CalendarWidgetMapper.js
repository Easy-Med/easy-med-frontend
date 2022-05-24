export default class CalendarWidgetMapper {
  static map(reservedVisit) {
    return {
      title: `${reservedVisit.patient.firstName} ${reservedVisit.patient.lastName}`,
      start: reservedVisit.startDate,
      end: reservedVisit.endDate,
    };
  }
}
