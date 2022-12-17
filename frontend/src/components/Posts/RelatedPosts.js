import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GET_POSTS } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import PostCardHorizontal from "./PostCardHorizontal";

const RelatedPosts = () => {
  const { slug } = useParams();
  const [post, setVideos] = useState([]);
  useEffect(() => {
    const fecthPost = async () => {
      const response = await FetchWrapper.get(
        `${GET_POSTS}related-posts/${slug}`
      );
      if (response) {
        setVideos(response);
      }
    };
    fecthPost();
  }, [slug]);

  return (
    <div className="w-full h-full mx-10 border-t">
      {post && (
        <div className="">
          <div className="py-[10px]">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 py-6">
              Suggestions
            </h1>
          </div>
          <div className="w-full">
            {post &&
              post?.map((post, index) => (
                <PostCardHorizontal key={index} post={post} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedPosts;
