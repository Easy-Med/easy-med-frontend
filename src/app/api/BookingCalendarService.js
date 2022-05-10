import request from "./request";

export default class BookingCalendarService {
  static getAvailabilityForDoctor(id) {
    return request({
      url: `/api/doctor/${id}/schedule`,
      method: "GET",
    });
  }
}
