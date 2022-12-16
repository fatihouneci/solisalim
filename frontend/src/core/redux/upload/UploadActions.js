import {
  UPLOAD_AUDIO,
  UPLOAD_IMG,
  UPLOAD_VIDEO,
} from "../../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/FetchWrapper";
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

// upload image
export const uploadImage = (image) => async (dispatch) => {
  dispatch({ type: IMAGE_UPLOAD_REQUEST });
  FetchWrapper.post(`${UPLOAD_IMG}`, image)
    .then((response) => {
      const user = response;
      dispatch({ type: IMAGE_UPLOAD_SUCCESS, payload: user });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: IMAGE_UPLOAD_FAILURE, payload: errorMsg });
    });
};

// upload audio
export const uploadAudio = (audio) => async (dispatch) => {
  dispatch({ type: AUDIO_UPLOAD_REQUEST });
  FetchWrapper.post(`${UPLOAD_AUDIO}`, audio)
    .then((response) => {
      const audio = response.data;
      dispatch({ type: AUDIO_UPLOAD_SUCCESS, payload: audio });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: AUDIO_UPLOAD_FAILURE, payload: errorMsg });
    });
};

// upload video
export const uploadVideo = (video) => async (dispatch) => {
  dispatch({ type: VIDEO_UPLOAD_REQUEST });
  FetchWrapper.post(`${UPLOAD_VIDEO}`, video)
    .then((response) => {
      const video = response;
      dispatch({ type: VIDEO_UPLOAD_SUCCESS, payload: video });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: VIDEO_UPLOAD_FAILURE, payload: errorMsg });
    });
};
