import React from "react";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "../../core/helpers/utility";

export default function PostCardHorizontal({ post }) {
  return (
    <Link
      to={`/posts/${post.slug}`}
      className="hover:bg-gray-100 py-1 flex space-x-2 mb-5 items-center"
    >
      <div className="flex-[1]">
        <h3 className="font-semibold mb-2 line-clamp-1">{post.title}</h3>
      </div>
      <div className="">
        <img
          className="w-[60px] h-[50px] border object-cover"
          src={post.coverPicture}
        />
      </div>
    </Link>
  );
}
