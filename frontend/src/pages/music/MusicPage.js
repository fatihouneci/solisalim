import { SearchIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../components/LoadingError/Loading";
import Message from "../../components/LoadingError/Error";
import { GET_CATEGORIES, GET_MUSICS } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import { history } from "../../core/helpers/history";
import Pagination from "../../core/components/common/Pagination";
import { listMusic } from "../../core/redux/music/MusicActions";
import MusicCard from "../../components/music/MusicCard";
import { FaHeart, FaPlay } from "react-icons/fa";
import { formatTimeAgo } from "../../core/helpers/utility";
import Player from "../../components/Player";

const MusicPage = () => {
  const query = useLocation().search;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, error, musics, page, pages } = useSelector(
    (state) => state.listMusic
  );
  const [keyword, setKeyword] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.navigate(`/musics?keyword=${keyword}`);
    } else {
      history.navigate("/musics");
    }
  };

  useEffect(() => {
    dispatch(listMusic(query));
  }, [dispatch, query]);

  const [songs, setSongs] = useState([]);
  // const [isplaying, setisplaying] = useState(false);
  // const [currentSong, setCurrentSong] = useState();

  // const audioElem = useRef();

  // useEffect(() => {
  //   if (isplaying) {
  //     audioElem.current.play();
  //   } else {
  //     audioElem.current.pause();
  //   }
  // }, [isplaying]);

  // const onPlaying = () => {
  //   const duration = audioElem.current.duration;
  //   const ct = audioElem.current.currentTime;

  //   setCurrentSong({
  //     ...currentSong,
  //     progress: (ct / duration) * 100,
  //     length: duration,
  //   });
  // };

  const handleLike = async (musicId) => {
    const response = await FetchWrapper.post(
      `${GET_MUSICS}like/${musicId}`,
      {}
    );
    if (response) {
      dispatch(listMusic(query));
    }
  };

  // const handlePlayPause = (music) => {
  //   setCurrentSong(music);
  //   setisplaying(true);
  // };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="py-4 flex items-center justify-between sticky top-0 z-50 bg-white">
        <h1 className="text-3xl">Musiques</h1>
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
            to="/musics/new"
          >
            Nouvel audio
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
          <div className="w-full">
            {musics?.map((v, i) => (
              // <MusicCard key={i} music={v} />
              <div className="w-full flex item-center justify-between mb-2 border-b p-2 hover:bg-gray-50">
                <div className="flex item-center space-x-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Google_Play_Music_icon_%282016-2020%29.svg/800px-Google_Play_Music_icon_%282016-2020%29.svg.png"
                    className="w-10 h-10 mr-10"
                  />
                  <div className="flex flex-1 flex-col justify-start items-start">
                    <h3 className="text-gray-500">{v?.title}</h3>
                    <p className="text-xs">{v?.description}</p>
                  </div>
                </div>
                <div className="flex item-center space-x-4">
                  <div className="flex items-center text-xs">
                    <span>{v?.views} vues . </span>
                    <span>{formatTimeAgo(v?.createdAt)}</span>
                  </div>
                  <>
                    <Player url={v.musicUrl} />
                  </>
                  <button
                    onClick={() => handleLike(v._id)}
                    className="flex items-center"
                  >
                    <span>{v?.likes.length}</span>
                    <FaHeart className="w-8 h-8 p-2 text-gray-500" />
                  </button>
                </div>
              </div>
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

export default MusicPage;
