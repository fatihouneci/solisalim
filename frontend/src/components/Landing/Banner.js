import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import { GET_POSTS } from "../../constants/apiEndpoints";

const Banner = () => {
  const [slides, setSlides] = useState([]);
  useEffect(async () => {
    const response = await FetchWrapper.get(`${GET_POSTS}`);
    setSlides(response.posts);
  }, []);
  return (
    <div className="max-w-6xl mx-auto md:px-4 py-4">
      {slides.length > 0 && (
        <Carousel
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          autoPlay={true}
          interval={5000}
        >
          {slides?.map((slide, index) => (
            <div key={index} className="rounded-lg">
              <img
                loading="lazy"
                src={slide.coverPicture}
                className="h-[500px] rounded-[10px]"
              />
              <div className="block w-full mx-auto">
                <div className="absolute top-[40%] sm:text-center lg:text-center w-full">
                  <h1 className="my-4 mx-auto w-10/12 px-2 truncate text-4xl font-semibold text-center text-white text-ellipsis overflow-hidden">
                    {slide.title}
                  </h1>
                  <div className="hidden md:block mx-auto text-center w-10/12 truncate text-2xl text-white mt-5">
                    {slide.description}
                  </div>
                  <div className="flex item-center justify-center sm:mt-8 sm:flex sm:justify-center lg:justify-center">
                    <div className="block rounded-full text-white bg-green-600 hover:bg-green-700">
                      <a
                        href={`/posts/${slide.slug}`}
                        className="flex items-center justify-center px-4 py-2 text-md font-medium md:py-2 md:text-lg md:px-5 text-center"
                      >
                        Voir à l'article
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Banner;
