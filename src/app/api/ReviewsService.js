import request from "./request";

export default class ReviewsService {
  static getReviewsFor(role, id) {
    return request({
      url: `/api/${role}/${id}/reviews`,
      method: "GET",
    });
  }
}
