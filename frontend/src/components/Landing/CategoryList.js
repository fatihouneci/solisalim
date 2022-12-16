import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

import { GET_CATEGORIES } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/apiRequest";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const httpRequest = FetchWrapper();

  useEffect(async () => {
    const response = await httpRequest.get(GET_CATEGORIES);
    setCategories(response);
  }, []);

  const slideLeft = () => {
    var slider = document.getElementById("slider-category");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider-category");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="max-w-6xl mx-auto sm:px-4 py-4">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 py-6">
        Catégories
      </h2>
      <div className="w-full relative flex items-center justify-center">
        <ChevronLeftIcon
          className="w-10 h-10 p-2 bg-white border-2 shadow rounded-full z-10 absolute left-[-50px] cursor-pointer hover:opacity-50"
          onClick={slideLeft}
        />
        <div
          id="slider-category"
          className="w-[100%] h-[100%] px-4 py-4 whitespace-nowrap overflow-x-scroll overflow-hidden no-scrollbar scroll-smooth"
        >
          {categories.map((post, index) => {
            return (
              <Link
                to={`/posts/${post._id}`}
                key={index}
                title={post.title}
                className="text-white/90 hover:text-white/100 cursor-pointer w-[250px] bg-green-500 rounded-md inline-block mr-5 hover:scale-105 transform transition duration-300 ease-out"
              >
                <div className="relative h-[200px] w-[250px]">
                  <img
                    src={post.coverPicture}
                    layout="fill"
                    className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-100 group-hover:opacity-100"
                  />
                </div>
                <div className="absolute bottom-[150px] inset-x-0 ml-4 space-x-3.5">
                  <div className="text-[16px]">
                    <h4 className="font-extrabold truncate w-44 uppercase">
                      {post.name}
                    </h4>
                    <h6 className="truncate w-44">{post.description}</h6>
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
};

export default CategoryList;
