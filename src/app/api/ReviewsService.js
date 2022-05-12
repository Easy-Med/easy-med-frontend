import request from "./request";

export default class ReviewsService {
    static getReviews(role, id) {
        return request({
          url: `/api/${role}/${id}/reviews`,
          method: "GET",
        });
      }
}
