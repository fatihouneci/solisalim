import { ArrowLeftIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import PostCard from "../../components/Posts/PostCard";
import { GET_POSTS } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import { listPost } from "../../core/redux/post/PostActions";

const PostSearchPage = () => {
  const query = useLocation().search;
  const dispatch = useDispatch();
  const { loading, error, posts, page, pages } = useSelector(
    (state) => state.listPost
  );

  useEffect(() => {
    dispatch(listPost(query));
  }, [dispatch, query]);

  return (
    <div className="w-full h-screen">
      <div className="flex">
        <div className="max-w-6xl">
          <div className="py-4 flex items-center space-x-4">
            <Link to="/posts">
              <ArrowLeftIcon className="w-6 h-6 hover:text-gray-500" />
            </Link>
            <h1 className="text-3xl">Résultats de la recherche</h1>
          </div>
          <p>Nombre de posts trouvées {posts?.length}</p>
          <div className="grid grid-cols-4 gap-x-4 my-5">
            {posts?.map((v, i) => (
              <PostCard key={i} post={v} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSearchPage;
