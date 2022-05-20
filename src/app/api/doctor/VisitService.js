import request from "../request";

export default class VisitService {
  static getDoctorsVisits(id) {
    return request({
      url: `/api/doctor/${id}/visits`,
      method: "GET",
    });
  }

  static completeVisit(id) {
    return request({
      url: `/api/doctor/visit/${id}/complete`,
      method: "PATCH",
    });
  }
}