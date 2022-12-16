import { GET_POSTS, UPLOAD_IMG } from "../../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/FetchWrapper";
import {
  POST_CREATE_FAILURE,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DETAILS_FAILURE,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_LIST_FAILURE,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_SEARCH_FAILURE,
  POST_SEARCH_REQUEST,
  POST_SEARCH_SUCCESS,
  POST_UPDATE_FAILURE,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPLOAD_FAILURE,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
} from "./PostTypes";

// Get all posts
export const listPost =
  (query = "") =>
  async (dispatch) => {
    dispatch({ type: POST_LIST_REQUEST });
    FetchWrapper.get(`${GET_POSTS}${query}`)
      .then((response) => {
        dispatch({ type: POST_LIST_SUCCESS, payload: response });
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch({ type: POST_LIST_FAILURE, payload: errorMsg });
      });
  };

// Get all posts
export const searchPost = () => async (dispatch) => {
  dispatch({ type: POST_SEARCH_REQUEST });
  FetchWrapper.get(`${GET_POSTS}`)
    .then((response) => {
      const posts = response;
      dispatch({ type: POST_SEARCH_SUCCESS, payload: posts });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: POST_SEARCH_FAILURE, payload: errorMsg });
    });
};

// Delete product
export const deletePost = (id) => async (dispatch, getState) => {
  dispatch({ type: POST_DELETE_REQUEST });
  FetchWrapper.delete(`${GET_POSTS}delete/${id}`)
    .then((response) => {
      dispatch({ type: POST_DELETE_SUCCESS, payload: true });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: POST_DELETE_FAILURE, payload: errorMsg });
    });
};

// Create product
export const createPost = (post) => async (dispatch) => {
  dispatch({ type: POST_CREATE_REQUEST });
  FetchWrapper.post(`${GET_POSTS}create`, post)
    .then((response) => {
      const post = response;
      dispatch({ type: POST_CREATE_SUCCESS, payload: post });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: POST_CREATE_FAILURE, payload: errorMsg });
    });
};

// Get single product
export const postDetails = (id) => async (dispatch) => {
  dispatch({ type: POST_DETAILS_REQUEST });
  FetchWrapper.get("http://localhost:2000/api/posts/" + id)
    .then((response) => {
      const post = response;
      dispatch({
        type: POST_DETAILS_SUCCESS,
        success: true,
        payload: post,
      });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: POST_DETAILS_FAILURE, payload: errorMsg });
    });
};

// Update post
export const updatePost = (id, post) => async (dispatch) => {
  dispatch({ type: POST_UPDATE_REQUEST });
  FetchWrapper.post("http://localhost:2000/api/posts/update/" + id, post)
    .then((response) => {
      const post = response;
      dispatch({
        type: POST_UPDATE_SUCCESS,
        success: true,
        payload: post,
      });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: POST_UPDATE_FAILURE, payload: errorMsg });
    });
};

export const updateAvatar = (dispatch, file) => {
  dispatch({
    type: POST_UPLOAD_REQUEST,
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
        type: POST_UPLOAD_SUCCESS,
        payload: user,
      });
    })
    .catch((error) => {
      const errorMsg = error.response.data.message;
      dispatch({
        type: POST_UPLOAD_FAILURE,
        payload: errorMsg,
      });
    });
};
