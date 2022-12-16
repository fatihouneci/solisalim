import {
  EDIT_ME,
  LOGIN,
  LOGOUT,
  REGISTER,
  UPLOAD_IMG,
} from "../../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/FetchWrapper";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  UPDATE_AVATAR_REQUEST,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./authTypes";

export const register = (dispatch, user) => {
  dispatch({
    type: REGISTER_REQUEST,
  });
  FetchWrapper.post(`${REGISTER}`, user)
    .then((response) => {
      const user = response.data;
      dispatch({
        type: REGISTER_SUCCESS,
        payload: user,
      });
    })
    .catch((error) => {
      const errorMsg = error.response.data.message;
      dispatch({
        type: REGISTER_FAILURE,
        payload: errorMsg,
      });
    });
};

export const login = (dispatch, { email, password }) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  FetchWrapper.post(`${LOGIN}`, {
    email,
    password,
  })
    .then((response) => {
      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
    })
    .catch((error) => {
      const errorMsg = error.response.data.message;
      dispatch({
        type: LOGIN_FAILURE,
        payload: errorMsg,
      });
    });
};

export const updateProfile = (
  dispatch,
  { profilePicture, email, fullName, about_me }
) => {
  dispatch({
    type: UPDATE_PROFILE_REQUEST,
  });
  FetchWrapper.post(`${EDIT_ME}`, {
    profilePicture,
    email,
    fullName,
    about_me,
  })
    .then((response) => {
      const user = JSON.parse(localStorage.getItem("user"));
      user.profile = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: user,
      });
    })
    .catch((error) => {
      const errorMsg = error.response.data.message;
      dispatch({
        type: UPDATE_PROFILE_FAILURE,
        payload: errorMsg,
      });
    });
};

export const updateAvatar = (dispatch, file) => {
  dispatch({
    type: UPDATE_AVATAR_REQUEST,
  });
  const formData = new FormData();
  formData.append("imageMsg", file, file.name);
  FetchWrapper.post(`${UPLOAD_IMG}`, formData)
    .then((response) => {
      const imageUrl = response.data;
      const user = JSON.parse(localStorage.getItem("user"));
      user.profile.profilePicture = imageUrl;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: UPDATE_AVATAR_SUCCESS,
        payload: user,
      });
    })
    .catch((error) => {
      const errorMsg = error.response.data.message;
      dispatch({
        type: UPDATE_AVATAR_FAILURE,
        payload: errorMsg,
      });
    });
};

export const logout = (dispatch) => {
  dispatch({
    type: LOGOUT_REQUEST,
  });
  FetchWrapper.post(`${LOGOUT}`)
    .then(() => {
      localStorage.clear();
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({
        type: LOGOUT_FAILURE,
        payload: errorMsg,
      });
    });
};
