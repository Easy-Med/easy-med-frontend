import axios from "axios";

const client = (() => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URI}`,
    headers: {
      "Content-type": "application/json",
    },
  });
})();

export const request = async function (requestConfig, options) {
  const defaultOnSuccess = function (response) {
    const { data } = response;

    return data;
  };

  const defaultOnError = function (error) {
    return Promise.reject(error.response);
  };

  return client(requestConfig)
    .then(options?.onSuccess ? options.onSuccess : defaultOnSuccess)
    .catch(options?.onError ? options.onError : defaultOnError);
};

export default request;
