import React from "react";
import { Link } from "react-router-dom";

export default function PostCardHorizontal({ post }) {
  return (
    <Link
      to={`/posts/${post.slug}`}
      className="hover:bg-gray-100 p-2 flex space-x-2 mb-2 items-center rounded-lg"
    >
      <div className="">
        <img
          className="w-[90px] h-[90px] border object-cover rounded-[20px]"
          src={post.coverPicture}
        />
      </div>
      <div className="flex-[1]">
        <h3 className="font-semibold mb-2 line-clamp-1">{post.title}</h3>
      </div>
    </Link>
  );
}
