import {
  DELETE_IMAGES,
  GET_IMAGES,
  NEW_IMAGES,
  UPDATE_IMAGES,
} from "../../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/FetchWrapper";
import {
  IMAGE_CREATE_FAILURE,
  IMAGE_CREATE_REQUEST,
  IMAGE_CREATE_SUCCESS,
  IMAGE_DELETE_FAILURE,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
  IMAGE_EDIT_FAILURE,
  IMAGE_EDIT_REQUEST,
  IMAGE_EDIT_SUCCESS,
  IMAGE_LIST_FAILURE,
  IMAGE_LIST_REQUEST,
  IMAGE_LIST_SUCCESS,
  IMAGE_UPDATE_FAILURE,
  IMAGE_UPDATE_REQUEST,
  IMAGE_UPDATE_SUCCESS,
} from "./ImageTypes";

// Get all images
export const listImage = () => async (dispatch) => {
  dispatch({ type: IMAGE_LIST_REQUEST });
  FetchWrapper.get(`${GET_IMAGES}`)
    .then((response) => {
      const images = response;
      dispatch({ type: IMAGE_LIST_SUCCESS, payload: images });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: IMAGE_LIST_FAILURE, payload: errorMsg });
    });
};

// Delete product
export const deleteImage = (id) => async (dispatch) => {
  dispatch({ type: IMAGE_DELETE_REQUEST });
  FetchWrapper.delete(`${DELETE_IMAGES}` + id)
    .then((response) => {
      dispatch({ type: IMAGE_DELETE_SUCCESS, payload: true });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: IMAGE_DELETE_FAILURE, payload: errorMsg });
    });
};

// Create product
export const createImage = (image) => async (dispatch) => {
  dispatch({ type: IMAGE_CREATE_REQUEST });
  FetchWrapper.post(`${NEW_IMAGES}`, image)
    .then((response) => {
      const image = response;
      dispatch({ type: IMAGE_CREATE_SUCCESS, payload: image });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: IMAGE_CREATE_FAILURE, payload: errorMsg });
    });
};

// Get single product
export const editImage = (id) => async (dispatch) => {
  dispatch({ type: IMAGE_EDIT_REQUEST });
  FetchWrapper.get(`${GET_IMAGES}` + id)
    .then((response) => {
      const image = response;
      dispatch({ type: IMAGE_EDIT_SUCCESS, success: true, payload: image });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: IMAGE_EDIT_FAILURE, payload: errorMsg });
    });
};

// Update image
export const updateImage = (id, image) => async (dispatch) => {
  dispatch({ type: IMAGE_UPDATE_REQUEST });
  FetchWrapper.post(`${UPDATE_IMAGES}` + id, image)
    .then((response) => {
      const image = response;
      dispatch({
        type: IMAGE_UPDATE_SUCCESS,
        success: true,
        payload: image,
      });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: IMAGE_UPDATE_FAILURE, payload: errorMsg });
    });
};
