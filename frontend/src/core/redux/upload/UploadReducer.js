import {
  AUDIO_UPLOAD_FAILURE,
  AUDIO_UPLOAD_REQUEST,
  AUDIO_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  VIDEO_UPLOAD_FAILURE,
  VIDEO_UPLOAD_REQUEST,
  VIDEO_UPLOAD_SUCCESS,
} from "./UploadTypes";

export const uploadImageReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_REQUEST:
      return { loading: true };
    case IMAGE_UPLOAD_SUCCESS:
      return { loading: false, success: true, image: action.payload };
    case IMAGE_UPLOAD_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const uploadAudioReducer = (state = {}, action) => {
  switch (action.type) {
    case AUDIO_UPLOAD_REQUEST:
      return { loading: true };
    case AUDIO_UPLOAD_SUCCESS:
      return { loading: false, success: true, audio: action.payload };
    case AUDIO_UPLOAD_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const uploadVideoReducer = (state = {}, action) => {
  switch (action.type) {
    case VIDEO_UPLOAD_REQUEST:
      return { loading: true };
    case VIDEO_UPLOAD_SUCCESS:
      return { loading: false, success: true, video: action.payload };
    case VIDEO_UPLOAD_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
