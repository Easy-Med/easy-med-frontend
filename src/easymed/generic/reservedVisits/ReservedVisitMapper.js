import moment from "moment";

export default class ReservedVisitMapper {
  static map(reservedVisit, role) {
    switch (role) {
      case "doctor":
        return {
          pesel: reservedVisit.patient.personalIdentityNumber,
          "e-mail": reservedVisit.patient.emailAddress,
          telephone: reservedVisit.patient.telephoneNumber,
          date: moment(reservedVisit.startDate).format("DD.MM.YYYY HH:mm"),
          location: reservedVisit.location,
          completed: reservedVisit.isCompleted ? "Yes" : "No",
        };
      case "patient":
        return {
          date: moment(reservedVisit.date).format("DD.MM.YYYY HH:mm"),
          location: reservedVisit.location,
          doctor: `Dr. ${reservedVisit.doctorName}\n${reservedVisit.medicalSpecialization}`,
          completed: reservedVisit.completed ? "Yes" : "No",
        };
      default:
        return undefined;
    }
  }
}
