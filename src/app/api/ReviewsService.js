import request from "./request";

export default class ReviewsService {
  static getReviewsFor(role, id) {
    return request({
      url: `/api/${role}/${id}/reviews`,
      method: "GET",
    });
  }

  static getPostReviewInfo(id) {
    return request({
      url: `/api/patient/${id}/reviews/available-doctors`,
      method: "GET",
    });
  }

  static postReviewForDoctorId(id, formData) {
    return request({
      url: `/api/doctor/${id}/reviews`,
      method: "POST",
      data: formData,
    });
  }
}
