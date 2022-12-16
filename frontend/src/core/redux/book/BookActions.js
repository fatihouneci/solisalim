import {
  DELETE_BOOK,
  GET_BOOKS,
  NEW_BOOKS,
} from "../../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/FetchWrapper";
import {
  BOOK_CREATE_FAILURE,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_DELETE_FAILURE,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_EDIT_FAILURE,
  BOOK_EDIT_REQUEST,
  BOOK_EDIT_SUCCESS,
  BOOK_LIST_FAILURE,
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_UPDATE_FAILURE,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
} from "./BookTypes";

// Get all books
export const listBook =
  (query = "") =>
  async (dispatch) => {
    dispatch({ type: BOOK_LIST_REQUEST });
    FetchWrapper.get(`${GET_BOOKS}${query}`)
      .then((response) => {
        const books = response;
        dispatch({ type: BOOK_LIST_SUCCESS, payload: books });
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch({ type: BOOK_LIST_FAILURE, payload: errorMsg });
      });
  };

// Delete product
export const deleteBook = (id) => async (dispatch) => {
  dispatch({ type: BOOK_DELETE_REQUEST });
  FetchWrapper.delete(`${DELETE_BOOK}` + id)
    .then((response) => {
      dispatch({ type: BOOK_DELETE_SUCCESS, payload: true });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: BOOK_DELETE_FAILURE, payload: errorMsg });
    });
};

// Create product
export const createBook = (book) => async (dispatch) => {
  dispatch({ type: BOOK_CREATE_REQUEST });
  FetchWrapper.post(`${NEW_BOOKS}`, book)
    .then((response) => {
      const book = response;
      dispatch({ type: BOOK_CREATE_SUCCESS, payload: book });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: BOOK_CREATE_FAILURE, payload: errorMsg });
    });
};

// Get single product
export const editBook = (id) => async (dispatch) => {
  dispatch({ type: BOOK_EDIT_REQUEST });
  FetchWrapper.get(`${GET_BOOKS}` + id)
    .then((response) => {
      const book = response;
      dispatch({ type: BOOK_EDIT_SUCCESS, success: true, payload: book });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: BOOK_EDIT_FAILURE, payload: errorMsg });
    });
};

// Update book
export const updateBook = (id, book) => async (dispatch) => {
  dispatch({ type: BOOK_UPDATE_REQUEST });
  FetchWrapper.put(`${GET_BOOKS}` + id, book)
    .then((response) => {
      const book = response;
      dispatch({
        type: BOOK_UPDATE_SUCCESS,
        success: true,
        payload: book,
      });
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch({ type: BOOK_UPDATE_FAILURE, payload: errorMsg });
    });
};
