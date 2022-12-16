// export const SOCKET_URL = "http://localhost:2000";
// export const BASE_URL = "http://localhost:2000/api";

export const SOCKET_URL = "/";
export const BASE_URL = "/api";

export const RECENTS_POST = BASE_URL + "/dash/recents";
export const POPULAR_POST = BASE_URL + "/dash/popular";
export const EXCLUSIF_POST = BASE_URL + "/dash/exclusif";

export const REGISTER = BASE_URL + "/auth/register";
export const LOGIN = BASE_URL + "/auth/login";
export const LOGOUT = BASE_URL + "/auth/logout";
export const CHECK_EMAIL = BASE_URL + "/auth/verify-email";
export const FORGOT_PASSWORD = BASE_URL + "/auth/forgot-password";
export const RESET_PASSWORD = BASE_URL + "/auth/reset-password";

export const GET_ME = BASE_URL + "/auth/me";
export const EDIT_ME = BASE_URL + "/auth/me/update";
export const GET_CHAT = BASE_URL + "/chats/";

export const UPLOAD_IMG = BASE_URL + "/upload/upload-img";
export const UPLOAD_FILE = BASE_URL + "/upload/upload-file";
export const UPLOAD_AUDIO = BASE_URL + "/upload/upload-audio";
export const UPLOAD_VIDEO = BASE_URL + "/upload/upload-video";

// Blog End point
export const GET_USERS = BASE_URL + "/users/";
export const NEW_USER = BASE_URL + "/users/create/";
export const DELETE_USER = BASE_URL + "/users/delete/";
export const UPDATE_USER = BASE_URL + "/users/update/";

// Blog End point
export const GET_POSTS = BASE_URL + "/posts/";
export const NEW_POSTS = BASE_URL + "/posts/create";

export const GET_POSTS_BY_CATEGORY = BASE_URL + "/posts/category/";
export const GET_POSTS_BY_CATEGORY_NAME = BASE_URL + "/posts/category/byname/";
export const GET_CATEGORIES = BASE_URL + "/categories/";

// Video End point
export const GET_VIDEOS = BASE_URL + "/videos/";
export const NEW_VIDEOS = BASE_URL + "/videos/create";
export const DELETE_VIDEOS = BASE_URL + "/videos/delete";
export const UPDATE_VIDEOS = BASE_URL + "/videos/update";

// Music End point
export const GET_MUSICS = BASE_URL + "/musics/";
export const NEW_MUSICS = BASE_URL + "/musics/create";
export const DELETE_MUSICS = BASE_URL + "/musics/delete";

// Video End point
export const GET_BOOKS = BASE_URL + "/books/";
export const NEW_BOOKS = BASE_URL + "/books/create";
export const DELETE_BOOK = BASE_URL + "/books/delete";

// Comments End point
export const GET_COMMENTS = BASE_URL + "/comments/";
export const NEW_COMMENTS = BASE_URL + "/comments/create";
export const DELETE_COMMENT = BASE_URL + "/comments/delete";

// Image End point
export const GET_IMAGES = BASE_URL + "/images/";
export const NEW_IMAGES = BASE_URL + "/images/create";
export const UPDATE_IMAGES = BASE_URL + "/images/update";
export const DELETE_IMAGES = BASE_URL + "/images/delete";

// Tags End point
export const GET_TAGS = BASE_URL + "/tags/";
export const NEW_TAGS = BASE_URL + "/tags/create";
export const UPDATE_TAGS = BASE_URL + "/tags/update";
export const DELETE_TAGS = BASE_URL + "/tags/delete";
