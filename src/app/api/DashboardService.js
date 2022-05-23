import request from "./request";

export default class DashboardService {
  static getDailyInfoForDoctor(id) {
    return request({
      url: `/api/doctor/${id}/daily-info`,
      method: "GET",
    });
  }
}
