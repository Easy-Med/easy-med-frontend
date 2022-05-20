import request from "./request";

export default class ReservedVisitsService {
  static getReservedVisitsFor(role, id, filters) {
    return request({
      url:
        `/api/${role}/${id}/visits` +
        (filters.completed !== undefined && filters.completed.length === 1
          ? `?isCompleted=${filters.completed[0] === "yes"}`
          : ""),
      method: "GET",
    });
  }

  static completeVisit(id) {
    return request({
      url: `/api/doctor/visit/${id}/complete`,
      method: "PATCH",
    });
  }

  static cancelVisit(id) {
    return request({
      url: `/api/visit/${id}`,
      method: "DELETE",
    });
  }
}
