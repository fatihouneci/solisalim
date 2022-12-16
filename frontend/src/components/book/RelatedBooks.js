import React, { useEffect, useState } from "react";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import BookCard from "./BookCard";

const RelatedBooks = ({ tags }) => {
  const [book, setBooks] = useState([]);
  useEffect(() => {
    const fecthBook = async () => {
      const response = await FetchWrapper.get(
        `http://localhost:2000/api/books/tags?tags=${tags}`
      );
      if (response) {
        console.log(response);
        setBooks(response);
      }
    };
    fecthBook();
  }, [tags]);

  return (
    <>
      {book &&
        book?.map((book, index) => (
          <BookCard key={index} type="horizontal" book={book} />
        ))}
    </>
  );
};

export default RelatedBooks;
