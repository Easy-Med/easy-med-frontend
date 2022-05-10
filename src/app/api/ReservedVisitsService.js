import request from "./request";

export default class ReservedVisitsService {
  static getReservedVisitsForDoctor(id) {
    return request({
      url: `/api/doctor/${id}/visits`,
      method: "GET",
    });
  }
}
