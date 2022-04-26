import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URI}`,
  headers: {
    "Content-type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  // const accessToken = getStorageItem('authData')?.accessToken
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzIiwibmFtZWlkIjoiMjciLCJyb2xlIjoiRG9jdG9yIiwiZW1haWwiOiJtYXJ6ZWNraUBkb2N0b3IuY29tIiwibmJmIjoxNjUwOTkzODU1LCJleHAiOjE2NTEwMDEwNTUsImlhdCI6MTY1MDk5Mzg1NX0.swzVmi5H2_CS74BGOtvM622VMgRJ9nxKAj5-XGkloNY";
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  return req;
});

export const request = async function (requestConfig, options) {
  const defaultOnSuccess = function (response) {
    const { data } = response;

    return data;
  };

  const defaultOnError = function (error) {
    return Promise.reject(error.response);
  };

  return API(requestConfig)
    .then(options?.onSuccess ? options.onSuccess : defaultOnSuccess)
    .catch(options?.onError ? options.onError : defaultOnError);
};

export default request;
