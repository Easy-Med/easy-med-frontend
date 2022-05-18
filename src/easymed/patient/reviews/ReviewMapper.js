export default class ReviewMapper {
  static map(review, role) {
    return {
      id: review.id,
      description: review.description,
      firstName: review[role === "doctor" ? "patient" : "doctor"].firstName,
      lastName: review[role === "doctor" ? "patient" : "doctor"].lastName,
      createdAt: review.createdAt,
      rating: review.rating,
    };
  }
}