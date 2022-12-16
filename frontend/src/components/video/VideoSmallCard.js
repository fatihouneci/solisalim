import React from "react";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "../../core/helpers/utility";

const VideoSmallCard = ({ video }) => {
  return (
    <Link className="mb-[45px]" to={`/videos/${video.slug}`}>
      <div className="flex space-x-2">
        <img className="h-[90px] w-[150px]" src={video.coverPicture} alt="" />
        <div className="mb-5">
          <h1 className="text-sm font-semibold line-clamp-2">{video.title}</h1>
          <h2 className="text-xs text-gray-500 my-1 line-clamp-2">
            {video.description}
          </h2>
          <div className="text-[11px] text-gray-500">
            {video.views} vues • {formatTimeAgo(video.createdAt)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoSmallCard;
