import React from "react";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "../../core/helpers/utility";

const VideoCard = ({ video }) => {
  return (
    <Link className="mb-[45px]" to={`/videos/${video.slug}`}>
      <img className="h-[210px] w-full" src={video.coverPicture} alt="" />
      <div className="mt-[16px]">
        <h1 className="text-xl font-semibold line-clamp-2">{video.title}</h1>
        <h2 className="text-md text-gray-500 my-1 line-clamp-2">
          {video.description}
        </h2>
        <div className="text-xs text-gray-500">
          {video.views} vues • {formatTimeAgo(video.createdAt)}
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
