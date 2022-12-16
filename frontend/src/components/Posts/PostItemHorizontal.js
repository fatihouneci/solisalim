import React from "react";
import { Link } from "react-router-dom";
import { formatToDate } from "../../helpers/utility";

const PostItemHorizontal = ({ post }) => {
  return (
    <Link to={`/posts/${post._id}`}>
      <div className="flex items-center h-full w-full relative cursor-pointer hover:scale-105 hover:text-black/100 transition duration-200 ease-out group mx-auto my-5">
        <img
          src={post.coverPicture}
          className="w-[260px] h-[200px] inset-0 object-cover rounded-[50px] opacity-100 group-hover:opacity-100"
        />
        <div className="block ml-4 space-y-3.5 overflow-hidden">
          <h4 className="text-2xl font-semibold">{post.title}</h4>
          <h6 className="text-lg truncate">{post.description}</h6>
          <p className="text-gray-400">{formatToDate(post.createdAt)}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostItemHorizontal;
