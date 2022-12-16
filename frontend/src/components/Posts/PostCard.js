import React from "react";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "../../core/helpers/utility";

const PostCard = ({ post }) => {
  return (
    <Link className="mb-[45px]" to={`/posts/${post?.slug}`}>
      <img className="h-[210px] w-full" src={post?.coverPicture} alt="" />
      <div className="mt-[16px]">
        <h1 className="text-xl font-semibold line-clamp-2">{post?.title}</h1>
        <h2 className="text-md text-gray-500 my-1 line-clamp-2">
          {post?.description}
        </h2>
        <div className="text-xs text-gray-500">
          <span>{post?.views} vues . </span>
          <span>{formatTimeAgo(post?.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
