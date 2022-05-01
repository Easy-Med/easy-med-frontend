import request from "./request";

export default class SettingsService {
  static getAccountDataFor(role, id) {
    return request({
      url: `/api/${role}/${id}/details`,
      method: "GET",
    });
  }

  static updateAccountDataFor(role, id, formData, options) {
    return request(
      {
        url: `/api/${role}/${id}`,
        method: "PATCH",
        data: formData,
      },
      options
    );
  }

  static getDoctorSpecializations() {
    return request({
      url: `/api/doctor/specializations`,
      method: "GET",
    });
  }
}
