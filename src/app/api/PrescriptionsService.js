import request from "./request";

export default class PrescriptionsService {
  static getPrescriptionsFor(role, id) {
    return request({
      url: `/api/${role}/${id}/prescriptions`,
      method: "GET",
    });
  }

  static getPatientsWhoCanGetPrescriptionForDoctor(id) {
    return request({
      url: `/api/doctor/${id}/prescriptions/available-patients`,
      method: "GET",
    });
  }

  static issuePrescriptionFromDoctor(id, formData) {
    return request({
      url: `/api/doctor/${id}/prescriptions`,
      method: "POST",
      data: formData
    })
  }
}
