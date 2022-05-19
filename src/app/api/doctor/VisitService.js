import request from "../request";

export default class VisitService {
  static getDoctorsVisits(id) {
    return request({
      url: `/api/doctor/${id}/visits`,
      method: "GET",
    });
  }
}