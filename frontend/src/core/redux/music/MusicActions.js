import {
  DELETE_MUSICS,
  GET_MUSICS,
  NEW_MUSICS,
} from "../../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/FetchWrapper";
import {
  MUSIC_CREATE_FAILURE,
  MUSIC_CREATE_REQUEST,
  MUSIC_CREATE_SUCCESS,
  MUSIC_DELETE_FAILURE,
  MUSIC_DELETE_REQUEST,
  MUSIC_DELETE_SUCCESS,
  MUSIC_EDIT_FAILURE,
  MUSIC_EDIT_REQUEST,
  MUSIC_EDIT_SUCCESS,
  MUSIC_LIST_FAILURE,
  MUSIC_LIST_REQUEST,
  MUSIC_LIST_SUCCESS,
  MUSIC_UPDATE_FAILURE,
  MUSIC_UPDATE_REQUEST,
  MUSIC_UPDATE_SUCCESS,
} from "./MusicTypes";

// Get all musics
export const listMusic =
  (query = "") =>
  async (dispatch) => {
    dispatch({ type: MUSIC_LIST_REQUEST });
    FetchWrapper.get(`${GET_MUSICS}${query}`)
      .then((response) => {
        const musics = response;
        dispatch({ type: MUSIC_LIST_SUCCESS, payload: musics });
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch({ type: MUSIC_LIST_FAILURE, payload: errorMsg });
      });
  };

// Delete product
export const deleteMusic = (id) => async (dispatch) => {
  dispatch({ type: MUSIC_DELETE_REQUEST });
  FetchWrapper.delete(`${DELETE_MUSICS}${id}`)
    .then((response) => {
      dispatch({ type: MUSIC_DELETE_SUCCESS, payload: true });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: MUSIC_DELETE_FAILURE, payload: errorMsg });
    });
};

// Create product
export const createMusic = (music) => async (dispatch) => {
  dispatch({ type: MUSIC_CREATE_REQUEST });
  FetchWrapper.post(`${NEW_MUSICS}`, music)
    .then((response) => {
      const music = response;
      dispatch({ type: MUSIC_CREATE_SUCCESS, payload: music });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: MUSIC_CREATE_FAILURE, payload: errorMsg });
    });
};

// Get single product
export const editMusic = (id) => async (dispatch) => {
  dispatch({ type: MUSIC_EDIT_REQUEST });
  FetchWrapper.get(`${NEW_MUSICS}${id}`)
    .then((response) => {
      const music = response;
      dispatch({ type: MUSIC_EDIT_SUCCESS, success: true, payload: music });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: MUSIC_EDIT_FAILURE, payload: errorMsg });
    });
};

// Update music
export const updateMusic = (id, music) => async (dispatch) => {
  dispatch({ type: MUSIC_UPDATE_REQUEST });
  FetchWrapper.put(`${NEW_MUSICS}${id}`, music)
    .then((response) => {
      const music = response;
      dispatch({
        type: MUSIC_UPDATE_SUCCESS,
        success: true,
        payload: music,
      });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: MUSIC_UPDATE_FAILURE, payload: errorMsg });
    });
};
