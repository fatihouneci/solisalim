import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_AVATAR_REQUEST,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./authTypes";

const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case LOGIN_FAILURE:
      return {
        loading: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        error: "",
      };
    case LOGOUT_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case UPDATE_PROFILE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_AVATAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_AVATAR_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case UPDATE_AVATAR_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case REGISTER_FAILURE:
      return {
        loading: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
