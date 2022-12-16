import React from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "../../core/helpers/utility";

const MusicCard = ({ type, music }) => {
  return (
    <Link
      to={`/musics/${music?._id}`}
      className={`group ${
        type == "horizontal" ? "flex w-[400px] mb-2  space-x-2" : "mb-5"
      }`}
    >
      <div className="relative">
        <img
          className={`group-hover:opacity-50 w-full ${
            type == "horizontal"
              ? "flex-1 h-[120px] rounded"
              : "h-[202px] rounded"
          }`}
          src={music?.coverPicture}
        />
        <button class="hidden group-hover:block absolute top-0 left-0 right-0 bottom-0 m-auto w-10 h-10 border rounded-full bg-white">
          <FaPlay className="w-10 h-10 p-2" />
        </button>
      </div>
      <div className={`my-2 ${type == "horizontal" ? "flex-1" : ""}`}>
        <h3
          className={`line-clamp-1 text-gray-800 font-semibold ${
            type == "horizontal" ? "flex" : ""
          }`}
        >
          {music?.title}
        </h3>
        <p
          className={`text-gray-500 line-clamp-2 ${
            type == "horizontal" ? "flex" : ""
          }`}
        >
          {music?.description}
        </p>
        <div
          className={`text-gray-400 text-xs ${
            type == "horizontal" ? "flex" : "flex items-center space-x-4"
          }`}
        >
          <span>{music?.views} vues . </span>
          <span>{formatTimeAgo(music?.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default MusicCard;
