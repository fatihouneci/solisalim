import { SearchIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../components/LoadingError/Loading";
import Message from "../../components/LoadingError/Error";
import { GET_CATEGORIES } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import { history } from "../../core/helpers/history";
import Pagination from "../../core/components/common/Pagination";
import { listBook } from "../../core/redux/book/BookActions";
import BookCard from "../../components/book/BookCard";

const BookPage = () => {
  const query = useLocation().search;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, error, books, page, pages } = useSelector(
    (state) => state.listBook
  );
  const [keyword, setKeyword] = useState();
  const [categories, setCategories] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.navigate(`/books?keyword=${keyword}`);
    } else {
      history.navigate("/books");
    }
  };

  useEffect(() => {
    dispatch(listBook(query));
  }, [dispatch, query]);

  useEffect(async () => {
    const response = await FetchWrapper.get(`${GET_CATEGORIES}`);
    if (response) {
      setCategories(response);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="py-4 flex items-center justify-between sticky top-0 z-50 bg-white">
        <h1 className="text-3xl">Livres</h1>
        <div className="flex items-center flex-1 mx-10">
          <form
            onSubmit={submitHandler}
            className="flex w-full items-center space-x-1 border rounded-lg"
          >
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              type="search"
              className="flex-1 border-none mx-2 focus:ring-0"
              placeholder="Rechercher"
            />
            <button type="submit" className="border-l px-2 text-gray-500">
              <SearchIcon className="w-6 h-6" />
            </button>
          </form>
        </div>
        {user && user.profile.isAdmin && (
          <Link
            className="bg-green-500 text-white px-4 py-2 rounded border-green-500 hover:bg-green-600"
            to="/books/new"
          >
            Charger un livre
          </Link>
        )}
      </div>
      {loading ? (
        <div className="mb-5">
          <Loading />
        </div>
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-x-4 my-5">
            {books?.map((v, i) => (
              <BookCard key={i} book={v} />
            ))}
          </div>
          <div>
            {/* Pagination */}
            <Pagination
              page={page}
              pages={pages}
              keyword={keyword ? keyword : ""}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BookPage;
