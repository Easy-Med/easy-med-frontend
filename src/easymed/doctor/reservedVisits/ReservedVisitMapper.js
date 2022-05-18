import moment from "moment";

export default class ReservedVisitMapper {
  static map(reservedVisit) {
    return {
      pesel: reservedVisit.patient.personalIdentityNumber,
      "e-mail": reservedVisit.patient.emailAddress,
      telephone: reservedVisit.patient.telephoneNumber,
      date: moment(reservedVisit.startDate).format("DD.MM.YYYY HH:mm"),
      location: reservedVisit.location,
      completed: reservedVisit.completed ? "Yes" : "No",
    };
  }
}
