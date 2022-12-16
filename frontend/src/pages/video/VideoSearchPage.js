import { ArrowLeftIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import VideoCard from "../../components/video/VideoCard";
import { GET_VIDEOS } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";

const VideoSearchPage = () => {
  const query = useLocation().search;
  const [videos, setVideos] = useState([]);

  useEffect(async () => {
    const response = await FetchWrapper.get(`${GET_VIDEOS}search${query}`);
    if (response) {
      setVideos(response);
    }
  }, []);
  return (
    <div className="w-full h-screen">
      <div className="flex">
        <div className="max-w-6xl">
          <div className="py-4 flex items-center space-x-4">
            <Link to="/videos">
              <ArrowLeftIcon className="w-6 h-6 hover:text-gray-500" />
            </Link>
            <h1 className="text-3xl">Résultats de la recherche</h1>
          </div>
          <p>Nombre de videos trouvées {videos.length}</p>
          <div className="grid grid-cols-4 gap-x-4 my-5">
            {videos?.map((v, i) => (
              <VideoCard key={i} video={v} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSearchPage;
