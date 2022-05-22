import request from "./request";

export default class BookingCalendarService {
  static getAvailabilityForDoctor(id) {
    return request({
      url: `/api/doctor/${id}/schedule`,
      method: "GET",
    });
  }

  static addAvailabilityForDoctor(id, formData) {
    return request({
      url: `/api/doctor/${id}/schedule`,
      method: "POST",
      data: formData
    })
  }
}
