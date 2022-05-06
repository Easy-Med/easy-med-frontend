import request from "./request";
import moment from "moment";

export default class ReserveVisitService {
  static getSpecializations(options) {
    return request(
      {
        url: "/api/doctor/specializations",
        method: "GET",
      },
      options
    );
  }

  static getDoctorsWthSpecialization(specialization, options) {
    return request(
      {
        url: `/api/doctor?specialization=${specialization}`,
        method: "GET",
      },
      options
    );
  }

  static getDoctorFreeterms(id, date, options) {
    return request(
      {
        url: `/api/doctor/freeterms?doctorId=${id}&visitDateTime=${moment(
          date
        ).format("YYYY-MM-DD")}`,
        method: "GET",
      },
      options
    );
  }

  static getDoctorFreeDates(id, options) {
    return request(
      {
        url: `/api/doctor/dayswithfreeterm?doctorId=${id}`,
        method: "GET",
      },
      options
    );
  }

  static reserveVisit(fullDate, doctorId, patientId, options) {
    return request(
      {
        url: `/api/visit`,
        method: "POST",
        data: {
          visitDateTime: fullDate,
          doctorId: doctorId,
          patientId: patientId,
        },
      },
      options
    );
  }

  static deleteVisit(id, options) {
    return request(
      {
        url: `/api/visit/${id}`,
        method: "DELETE",
      },
      options
    );
  }
}
