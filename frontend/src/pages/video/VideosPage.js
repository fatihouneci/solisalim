import { SearchIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Message from "../../components/LoadingError/Error";
import Loading from "../../components/LoadingError/Loading";
import VideoCard from "../../components/video/VideoCard";
import Pagination from "../../core/components/common/Pagination";
import { history } from "../../core/helpers/history";
import { listVideo } from "../../core/redux/video/VideoActions";

const VideosPage = () => {
  const query = useLocation().search;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, error, videos, page, pages } = useSelector(
    (state) => state.listVideo
  );
  const [keyword, setKeyword] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.navigate(`/videos?keyword=${keyword}`);
    } else {
      history.navigate("/videos");
    }
  };

  useEffect(() => {
    dispatch(listVideo(query));
  }, [dispatch, query]);

  return (
    <div className="relative bg-white overflow-hidden px-4">
      <div className="max-w-6xl mx-auto">
        <div className="py-4 flex items-center justify-between sticky top-0 z-30 bg-white">
          <h1 className="text-xl md:text-3xl">Videos</h1>
          <div className="hidden">
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
                to="/videos/new"
              >
                Charger une vidéo
              </Link>
            )}
          </div>
        </div>
        {loading ? (
          <div className="mb-5">
            <Loading />
          </div>
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-x-4 my-5 md:grid-cols-3 lg:grid-cols-4">
              {videos?.map((v, i) => (
                <VideoCard key={i} video={v} />
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
    </div>
  );
};

export default VideosPage;
