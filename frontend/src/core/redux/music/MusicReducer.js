import {
  MUSIC_CREATE_FAILURE,
  MUSIC_CREATE_REQUEST,
  MUSIC_CREATE_SUCCESS,
  MUSIC_LIST_REQUEST,
  MUSIC_LIST_SUCCESS,
  MUSIC_LIST_FAILURE,
  MUSIC_EDIT_REQUEST,
  MUSIC_EDIT_SUCCESS,
  MUSIC_EDIT_FAILURE,
  MUSIC_DELETE_REQUEST,
  MUSIC_DELETE_SUCCESS,
  MUSIC_DELETE_FAILURE,
  MUSIC_UPDATE_REQUEST,
  MUSIC_UPDATE_SUCCESS,
  MUSIC_UPDATE_FAILURE,
} from "./MusicTypes";

export const musicListReducer = (state = { musics: [] }, action) => {
  switch (action.type) {
    case MUSIC_LIST_REQUEST:
      return { loading: true };
    case MUSIC_LIST_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        musics: action.payload.musics,
      };
    case MUSIC_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const musicCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MUSIC_CREATE_REQUEST:
      return { loading: true };
    case MUSIC_CREATE_SUCCESS:
      return { loading: false, success: true, music: action.payload };
    case MUSIC_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const musicEditReducer = (state = { music: {} }, action) => {
  switch (action.type) {
    case MUSIC_EDIT_REQUEST:
      return { ...state, loading: true };
    case MUSIC_EDIT_SUCCESS:
      return { loading: false, music: action.payload };
    case MUSIC_EDIT_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const musicDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MUSIC_DELETE_REQUEST:
      return { loading: true };
    case MUSIC_DELETE_SUCCESS:
      return { loading: false, success: action.payload };
    case MUSIC_DELETE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const musicUpdateReducer = (state = { music: {} }, action) => {
  switch (action.type) {
    case MUSIC_UPDATE_REQUEST:
      return { loading: true };
    case MUSIC_UPDATE_SUCCESS:
      return { loading: false, success: true, music: action.payload };
    case MUSIC_UPDATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
