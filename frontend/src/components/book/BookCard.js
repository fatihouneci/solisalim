import React from "react";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "../../core/helpers/utility";

const BookCard = ({ type, book }) => {
  return (
    <Link
      to={`/books/${book?._id}`}
      className={`${
        type == "horizontal" ? "flex w-[400px] mb-2  space-x-2" : "mb-5"
      }`}
    >
      <img
        className={`w-full ${
          type == "horizontal"
            ? "flex-1 h-[120px] rounded"
            : "h-[202px] rounded"
        }`}
        src={book?.coverPicture}
      />
      <div className={`my-2 ${type == "horizontal" ? "flex-1" : ""}`}>
        <h3
          className={`line-clamp-1 text-gray-800 font-semibold ${
            type == "horizontal" ? "flex" : ""
          }`}
        >
          {book?.title}
        </h3>
        <p
          className={`text-gray-500 line-clamp-2 ${
            type == "horizontal" ? "flex" : ""
          }`}
        >
          {book?.description}
        </p>
        <div
          className={`text-gray-400 text-xs ${
            type == "horizontal" ? "flex" : "flex items-center space-x-4"
          }`}
        >
          <span>{book?.views} vues . </span>
          <span>{formatTimeAgo(book?.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
