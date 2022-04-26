import request from "./request";

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
        url: `/api/doctor/freeterms?doctorId=${id}&visitDateTime=${date}`,
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
