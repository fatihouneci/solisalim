import {
  IMAGE_CREATE_FAILURE,
  IMAGE_CREATE_REQUEST,
  IMAGE_CREATE_SUCCESS,
  IMAGE_LIST_REQUEST,
  IMAGE_LIST_SUCCESS,
  IMAGE_LIST_FAILURE,
  IMAGE_EDIT_REQUEST,
  IMAGE_EDIT_SUCCESS,
  IMAGE_EDIT_FAILURE,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_FAILURE,
  IMAGE_UPDATE_REQUEST,
  IMAGE_UPDATE_SUCCESS,
  IMAGE_UPDATE_FAILURE,
} from "./ImageTypes";

export const imageListReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case IMAGE_LIST_REQUEST:
      return { loading: true };
    case IMAGE_LIST_SUCCESS:
      return { loading: false, images: action.payload };
    case IMAGE_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const imageCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_CREATE_REQUEST:
      return { loading: true };
    case IMAGE_CREATE_SUCCESS:
      return { loading: false, success: true, image: action.payload };
    case IMAGE_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const imageEditReducer = (state = { image: {} }, action) => {
  switch (action.type) {
    case IMAGE_EDIT_REQUEST:
      return { ...state, loading: true };
    case IMAGE_EDIT_SUCCESS:
      return { loading: false, image: action.payload };
    case IMAGE_EDIT_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const imageDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_DELETE_REQUEST:
      return { loading: true };
    case IMAGE_DELETE_SUCCESS:
      return { loading: false, success: action.payload };
    case IMAGE_DELETE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const imageUpdateReducer = (state = { image: {} }, action) => {
  switch (action.type) {
    case IMAGE_UPDATE_REQUEST:
      return { loading: true };
    case IMAGE_UPDATE_SUCCESS:
      return { loading: false, success: true, image: action.payload };
    case IMAGE_UPDATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
