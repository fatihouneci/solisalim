import { combineReducers } from "redux";
import authReducer, { registerReducer } from "./auth/authReducer";
import {
  bookCreateReducer,
  bookDeleteReducer,
  bookEditReducer,
  bookListReducer,
  bookUpdateReducer,
} from "./book/BookReducer";
import {
  imageCreateReducer,
  imageDeleteReducer,
  imageEditReducer,
  imageListReducer,
  imageUpdateReducer,
} from "./image/ImageReducer";
import {
  musicCreateReducer,
  musicDeleteReducer,
  musicEditReducer,
  musicListReducer,
  musicUpdateReducer,
} from "./music/MusicReducer";
import {
  postCreateReducer,
  postDeleteReducer,
  postDetailsReducer,
  postListReducer,
  postUpdateReducer,
} from "./post/PostReducer";
import { uploadImageReducer, uploadVideoReducer } from "./upload/UploadReducer";
import {
  userCreateReducer,
  userDeleteReducer,
  userEditReducer,
  userListReducer,
  userUpdateReducer,
} from "./user/UserReducer";
import {
  videoCreateReducer,
  videoDeleteReducer,
  videoEditReducer,
  videoListReducer,
  videoUpdateReducer,
} from "./video/VideoReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  registerUser: registerReducer,
  listUser: userListReducer,
  deleteUser: userDeleteReducer,
  updateUser: userUpdateReducer,
  editUser: userEditReducer,
  createUser: userCreateReducer,
  listPost: postListReducer,
  deletePost: postDeleteReducer,
  updatePost: postUpdateReducer,
  detailsPost: postDetailsReducer,
  createPost: postCreateReducer,
  listVideo: videoListReducer,
  deleteVideo: videoDeleteReducer,
  updateVideo: videoUpdateReducer,
  detailsVideo: videoEditReducer,
  createVideo: videoCreateReducer,
  listImage: imageListReducer,
  deleteImage: imageDeleteReducer,
  updateImage: imageUpdateReducer,
  detailsImage: imageEditReducer,
  createImage: imageCreateReducer,
  uploadImage: uploadImageReducer,
  uploadVideo: uploadVideoReducer,
  listBook: bookListReducer,
  deleteBook: bookDeleteReducer,
  updateBook: bookUpdateReducer,
  detailsBook: bookEditReducer,
  createBook: bookCreateReducer,
  listMusic: musicListReducer,
  deleteMusic: musicDeleteReducer,
  updateMusic: musicUpdateReducer,
  detailsMusic: musicEditReducer,
  createMusic: musicCreateReducer,
});

export default rootReducer;
