import React from "react";
import PostItemHorizontal from "./PostItemHorizontal";

const PostListHorizontal = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostItemHorizontal key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostListHorizontal;
