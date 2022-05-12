import axios from "axios";
import {getStorageItem} from "../utils/storage";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URI}`,
});

API.interceptors.request.use((req) => {
  const accessToken = getStorageItem('authData')?.accessToken
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
