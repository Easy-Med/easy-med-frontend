import request from "./request";

export default class UserService {
  static signUp(formData, options) {
    return request(
      {
        url: "/api/user/register",
        method: "POST",
        data: formData,
      },
      options
    );
  }

  static signIn(formData, options) {
    return request(
      {
        url: "/api/user/login",
        method: "POST",
        data: formData,
      },
      options
    );
  }
}
