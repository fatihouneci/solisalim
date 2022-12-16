import { HeartIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import { GET_BOOKS } from "../../constants/apiEndpoints";
import { formatTimeAgo } from "../../core/helpers/utility";
import RelatedBooks from "../../components/book/RelatedBooks";
import Comments from "../../components/comment/Comments";

const BookDetailsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const bookId = useParams().id;
  const [isOwner, setIsOwner] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await FetchWrapper.get(`${GET_BOOKS}${bookId}`);
      if (response) {
        setBook(response);
        if (response.userId === user.profile._id) {
          setIsOwner(true);
        }

        if (user.profile.isAdmin) {
          setIsAdmin(true);
        }
      }
    };
    fetchBook();
  }, [bookId]);

  const handleLike = async (e) => {
    e.preventDefault();
    const response = await FetchWrapper.post(`${GET_BOOKS}like/${bookId}`, {});
    if (response) {
      setBook(response.data);
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex my-5 space-x-5">
        <div className="flex-1">
          <div>
            <iframe
              width="100%"
              height="600"
              src={book?.bookUrl}
              sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
              title="YouTube"
              frameborder="0"
              allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <div className="mt-4 mb-2">
            <h1 className="text-2xl text-gray-800 font-semibold">
              {book?.title}
            </h1>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-500">
              <span>{book?.views} vues</span>
              <span>{formatTimeAgo(book?.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-5 text-gray-500">
              <button
                onClick={handleLike}
                className="flex items-center space-x-1 text-gray-900"
              >
                <HeartIcon className="w-6 h-6" />
                <span>{book?.likes.length}</span>
              </button>
              {(isAdmin || isOwner) && (
                <div>
                  <Link to={`/books/edit/${book._id}`}>Modifier</Link>
                </div>
              )}
            </div>
          </div>

          {/* Comments */}
          <Comments videoId={bookId} />
        </div>
        <div className="">
          <RelatedBooks tags={book?.tags} />
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
