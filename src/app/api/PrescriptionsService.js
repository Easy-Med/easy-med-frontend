import request from "./request";

export default class PrescriptionsService {
  static getPrescriptionsFor(role, id) {
    return request({
      url: `/api/${role}/${id}/prescriptions`,
      method: "GET",
    });
  }
}