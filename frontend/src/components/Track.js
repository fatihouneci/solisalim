import React, { useState } from "react";
import { ImHeadphones } from "react-icons/im";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Track = ({ post }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Link
      to={`/posts/${post._id}`}
      className="hover:cursor-pointer flex items-center justify-between space-x-20 cursor-default hover:bg-gray-600/10 py-2 px-4 rounded-lg group transition ease-out"
    >
      <div className="w-full flex items-center">
        <img
          src={post.coverPicture}
          className="rounded-xl h-12 w-12 object-cover mr-3"
        />
        <div className="">
          <h4 className="text-sm font-semibold truncate w-[450px]">
            {post.title}
          </h4>
          <p className="truncate w-[450px] text-[13px] group-hover:text-gray-800">
            {post.description}
          </p>
        </div>

        <div className="md:ml-auto flex items-center space-x-2.5">
          {/* <div className="flex space-x-1 text-sm font-semibold">
            <ImHeadphones className="text-lg" />
          </div> */}
          <div className="flex items-center justify-center rounded-full border-2  w-[85px] h-10 relative cursor-pointer group-hover:border-gray-500/40">
            <AiFillHeart
              className={`text-xl icon ${
                hasLiked ? "text-[#1ed760]" : "text-[#868686]"
              }`}
              onClick={() => setHasLiked(!hasLiked)}
            />
            {/* {isPlaying ? (
              <div className="h-10 w-10 rounded-full border border-[#15883e] flex items-center justify-center absolute -right-0.5 bg-[#15883e]  icon hover:scale-110">
                <BsFillPauseFill className="text-white text-xl" />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full border border-white/60 hover:border-[#15883e] flex items-center justify-center absolute -right-0.5 bg-[#eeeeee] hover:bg-[#15883e]  icon hover:scale-110">
                <BsFillPlayFill
                  onClick={() => handlePlay()}
                  className="text-[#868686] text-xl ml-[1px]"
                />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Track;
