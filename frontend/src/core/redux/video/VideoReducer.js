import {
  VIDEO_CREATE_FAILURE,
  VIDEO_CREATE_REQUEST,
  VIDEO_CREATE_SUCCESS,
  VIDEO_LIST_REQUEST,
  VIDEO_LIST_SUCCESS,
  VIDEO_LIST_FAILURE,
  VIDEO_EDIT_REQUEST,
  VIDEO_EDIT_SUCCESS,
  VIDEO_EDIT_FAILURE,
  VIDEO_DELETE_REQUEST,
  VIDEO_DELETE_SUCCESS,
  VIDEO_DELETE_FAILURE,
  VIDEO_UPDATE_REQUEST,
  VIDEO_UPDATE_SUCCESS,
  VIDEO_UPDATE_FAILURE,
} from "./VideoTypes";

export const videoListReducer = (state = { videos: [] }, action) => {
  switch (action.type) {
    case VIDEO_LIST_REQUEST:
      return { loading: true };
    case VIDEO_LIST_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        videos: action.payload.videos,
      };
    case VIDEO_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const videoCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VIDEO_CREATE_REQUEST:
      return { loading: true };
    case VIDEO_CREATE_SUCCESS:
      return { loading: false, success: true, video: action.payload };
    case VIDEO_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const videoEditReducer = (state = { video: {} }, action) => {
  switch (action.type) {
    case VIDEO_EDIT_REQUEST:
      return { ...state, loading: true };
    case VIDEO_EDIT_SUCCESS:
      return { loading: false, video: action.payload };
    case VIDEO_EDIT_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const videoDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VIDEO_DELETE_REQUEST:
      return { loading: true };
    case VIDEO_DELETE_SUCCESS:
      return { loading: false, success: action.payload };
    case VIDEO_DELETE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const videoUpdateReducer = (state = { video: {} }, action) => {
  switch (action.type) {
    case VIDEO_UPDATE_REQUEST:
      return { loading: true };
    case VIDEO_UPDATE_SUCCESS:
      return { loading: false, success: true, video: action.payload };
    case VIDEO_UPDATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
