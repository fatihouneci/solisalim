import React, { useEffect, useState } from "react";
import {
  GET_POSTS,
  GET_POSTS_BY_CATEGORY_NAME,
  POPULAR_POST,
} from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/apiRequest";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

function PopularPost() {
  const [posts, setPosts] = useState([]);
  const httpRequest = FetchWrapper();

  useEffect(async () => {
    const response = await httpRequest.get(`${POPULAR_POST}`);
    setPosts(response);
  }, []);

  const slideLeft = () => {
    var slider = document.getElementById("slider-popular");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider-popular");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 py-6">
        Populaires
      </h2>
      <div className="w-full relative flex items-center justify-center">
        <ChevronLeftIcon
          className="w-10 h-10 p-2 bg-white border-2 shadow rounded-full z-10 absolute left-[-50px] cursor-pointer hover:opacity-50"
          onClick={slideLeft}
        />
        <div
          id="slider-popular"
          className="w-[100%] h-[100%] px-4 py-4 whitespace-nowrap overflow-x-scroll overflow-hidden no-scrollbar scroll-smooth"
        >
          {posts?.map((post, index) => {
            return (
              <Link
                to={`/posts/${post.slug}`}
                key={index}
                title={post.title}
                className="w-[250px] cursor-pointer bg-white rounded-md inline-block mr-5 hover:scale-105 transform transition duration-300 ease-out"
              >
                <div className="relative h-[250px] w-[250px]">
                  <img
                    src={post.coverPicture}
                    layout="fill"
                    className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-100 group-hover:opacity-100"
                  />
                </div>
                <div className="w-full overflow-hidden py-5">
                  <div className="text-[16px]">
                    <h4 className="font-extrabold truncate uppercase">
                      {post.title}
                    </h4>
                    <h6 className="truncate">{post.description}</h6>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <ChevronRightIcon
          className="w-10 h-10 p-2 bg-white border-2 shadow rounded-full z-10 absolute right-[-50px] cursor-pointer hover:opacity-50"
          onClick={slideRight}
        />
      </div>
    </div>
  );
}

export default PopularPost;
