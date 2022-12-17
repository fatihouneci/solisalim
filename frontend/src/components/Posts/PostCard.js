import React from "react";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "../../core/helpers/utility";

const PostCard = ({ post }) => {
  return (
    <Link className="mb-[45px]" to={`/posts/${post?.slug}`}>
      <div className="relative h-[250px] w-[250px]">
        <img
          src={post.coverPicture}
          layout="fill"
          className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-100 group-hover:opacity-100"
        />
      </div>
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
