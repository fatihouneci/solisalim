import {
  DELETE_USER,
  GET_USERS,
  NEW_USER,
  UPDATE_USER,
} from "../../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/FetchWrapper";
import {
  USER_CREATE_FAILURE,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_EDIT_FAILURE,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "./UserTypes";

// Get all users
export const listUser = () => async (dispatch) => {
  dispatch({ type: USER_LIST_REQUEST });
  FetchWrapper.get(`${GET_USERS}`)
    .then((response) => {
      const users = response;
      dispatch({ type: USER_LIST_SUCCESS, payload: users });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: USER_LIST_FAILURE, payload: errorMsg });
    });
};

// Delete product
export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: USER_DELETE_REQUEST });
  FetchWrapper.delete(`${DELETE_USER}` + id)
    .then((response) => {
      dispatch({ type: USER_DELETE_SUCCESS, payload: true });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: USER_DELETE_FAILURE, payload: errorMsg });
    });
};

// Create product
export const createUser = (user) => async (dispatch) => {
  dispatch({ type: USER_CREATE_REQUEST });
  FetchWrapper.post(`${NEW_USER}`, user)
    .then((response) => {
      const user = response;
      dispatch({ type: USER_CREATE_SUCCESS, payload: user });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: USER_CREATE_FAILURE, payload: errorMsg });
    });
};

// Get single product
export const editUser = (id) => async (dispatch) => {
  dispatch({ type: USER_EDIT_REQUEST });
  FetchWrapper.get(`${GET_USERS}${id}`)
    .then((response) => {
      const user = response;
      dispatch({ type: USER_EDIT_SUCCESS, success: true, payload: user });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: USER_EDIT_FAILURE, payload: errorMsg });
    });
};

// Update user
export const updateUser = (id, user) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_REQUEST });
  FetchWrapper.post(`${UPDATE_USER}${id}`, user)
    .then((response) => {
      const user = response;
      dispatch({
        type: USER_UPDATE_SUCCESS,
        success: true,
        payload: user,
      });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: USER_UPDATE_FAILURE, payload: errorMsg });
    });
};
