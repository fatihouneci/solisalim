import axios from "axios";
import store from "../redux/store";

function authToken() {
  return store.getState().auth?.user?.token;
}

function authHeader() {
  // return auth header with jwt if user is logged in and request is to the api url
  const token = authToken();
  const isLoggedIn = !!token;
  return {
    headers: {
      Authorization: isLoggedIn ? `Bearer ${token}` : "",
    },
  };
}

const postRequest = (url, payload = {}, options = {}) => {
  return axios.post(url, payload, { ...authHeader(), ...options });
};

const putRequest = async (url, payload = {}, options = {}) => {
  const data = await axios
    .put(url, payload, { ...authHeader(), ...options })
    .then((resp) => resp.data)
    .catch((err) => ({ error: err.response.data }));
  return data;
};

const getRequest = async (url, options = {}) => {
  const data = await axios
    .get(url, { ...authHeader(), ...options })
    .then((resp) => resp.data)
    .catch((err) => ({ error: err.response.data }));
  return data;
};

const removeRequest = async (url, payload = {}, options = {}) => {
  const data = await axios
    .post(url, payload, { ...authHeader(), ...options })
    .then((resp) => resp.data)
    .catch((err) => ({ error: err.response.data }));
  return data;
};

const handleResponse = (response) => {
  if (response.error && response.error.code === 11000) {
    //alertService.error("Vous etes déja enregistré");
  } else {
    console.log(response.error.message);
  }
  return response;
};

export const FetchWrapper = {
  post: postRequest,
  put: putRequest,
  remove: removeRequest,
  get: getRequest,
};
