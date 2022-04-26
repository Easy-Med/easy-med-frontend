import request from "./request";

export default class SettingsService {
  static getAccountDataForDoctorId(id) {
    return request({
      url: `/api/doctor/${id}/details`,
      method: "GET",
    });
  }

  static updateAccountDataForDoctorId(id, formData, options) {
    return request(
      {
        url: `/api/doctor/${id}`,
        method: "PATCH",
        data: formData,
      },
      options
    );
  }
}
