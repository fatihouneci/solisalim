import {
  DELETE_VIDEOS,
  GET_VIDEOS,
  NEW_VIDEOS,
} from "../../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/FetchWrapper";
import {
  VIDEO_CREATE_FAILURE,
  VIDEO_CREATE_REQUEST,
  VIDEO_CREATE_SUCCESS,
  VIDEO_DELETE_FAILURE,
  VIDEO_DELETE_REQUEST,
  VIDEO_DELETE_SUCCESS,
  VIDEO_EDIT_FAILURE,
  VIDEO_EDIT_REQUEST,
  VIDEO_EDIT_SUCCESS,
  VIDEO_LIST_FAILURE,
  VIDEO_LIST_REQUEST,
  VIDEO_LIST_SUCCESS,
  VIDEO_UPDATE_FAILURE,
  VIDEO_UPDATE_REQUEST,
  VIDEO_UPDATE_SUCCESS,
} from "./VideoTypes";

// Get all videos
export const listVideo =
  (query = "") =>
  async (dispatch) => {
    dispatch({ type: VIDEO_LIST_REQUEST });
    FetchWrapper.get(`${GET_VIDEOS}${query}`)
      .then((response) => {
        const videos = response;
        dispatch({ type: VIDEO_LIST_SUCCESS, payload: videos });
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch({ type: VIDEO_LIST_FAILURE, payload: errorMsg });
      });
  };

// Delete product
export const deleteVideo = (id) => async (dispatch) => {
  dispatch({ type: VIDEO_DELETE_REQUEST });
  FetchWrapper.delete(`${DELETE_VIDEOS}${id}`)
    .then((response) => {
      dispatch({ type: VIDEO_DELETE_SUCCESS, payload: true });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: VIDEO_DELETE_FAILURE, payload: errorMsg });
    });
};

// Create product
export const createVideo = (video) => async (dispatch) => {
  dispatch({ type: VIDEO_CREATE_REQUEST });
  FetchWrapper.post(`${NEW_VIDEOS}`, video)
    .then((response) => {
      const video = response;
      dispatch({ type: VIDEO_CREATE_SUCCESS, payload: video });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: VIDEO_CREATE_FAILURE, payload: errorMsg });
    });
};

// Get single product
export const editVideo = (id) => async (dispatch) => {
  dispatch({ type: VIDEO_EDIT_REQUEST });
  FetchWrapper.get(`${GET_VIDEOS}${id}`)
    .then((response) => {
      const video = response;
      dispatch({ type: VIDEO_EDIT_SUCCESS, success: true, payload: video });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: VIDEO_EDIT_FAILURE, payload: errorMsg });
    });
};

// Update video
export const updateVideo = (id, video) => async (dispatch) => {
  dispatch({ type: VIDEO_UPDATE_REQUEST });
  FetchWrapper.put(`${GET_VIDEOS}${id}`, video)
    .then((response) => {
      const video = response;
      dispatch({
        type: VIDEO_UPDATE_SUCCESS,
        success: true,
        payload: video,
      });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: VIDEO_UPDATE_FAILURE, payload: errorMsg });
    });
};
