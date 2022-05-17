import request from "./request";

export default class SettingsService {
  static getAccountDataFor(role) {
    return request({
      url: `/api/${role}/details`,
      method: "GET",
    });
  }

  static updateAccountDataFor(role, formData) {
    return request({
      url: `/api/${role}`,
      method: "PATCH",
      data: formData,
    });
  }

  static getDoctorSpecializations() {
    return request({
      url: `/api/doctor/specializations`,
      method: "GET",
    });
  }
}
