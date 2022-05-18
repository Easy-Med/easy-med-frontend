import request from "./request";

export default class ReservedVisitsService {
  static getReservedVisitsForDoctor(id, {completed}) {
    return request({
      url:
        `/api/doctor/${id}/visits` +
        (completed !== undefined ? `?isCompleted=${completed}` : ""),
      method: "GET",
    });
  }

  static cancelVisit(id) {
    return request({
      url: `/api/visit/${id}`,
      method: "DELETE",
    });
  }
}
