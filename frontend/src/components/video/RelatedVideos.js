import React, { useEffect, useState } from "react";
import { GET_VIDEOS } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import VideoSmallCard from "./VideoSmallCard";

const RelatedVideos = ({ videoId }) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fecthVideo = async () => {
      const response = await FetchWrapper.get(
        `${GET_VIDEOS}related-videos/${videoId}`
      );
      if (response) {
        setVideos(response);
      }
    };
    fecthVideo();
  }, [videoId]);

  return (
    <>
      {videos &&
        videos?.map((video, index) => (
          <VideoSmallCard key={index} video={video} />
        ))}
    </>
  );
};

export default RelatedVideos;
