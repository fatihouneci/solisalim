import React from "react";
import RecentsPost from "../../components/Landing/RecentsPost";
import PopularPost from "../../components/Landing/PopularPost";
import ExclusifPost from "../../components/Landing/ExclusifPost";
import Banner from "../../components/Landing/Banner";

const LandingPage = () => {
  return (
    <div className="relative bg-white overflow-hidden px-4">
      <Banner />
      <RecentsPost />
      <PopularPost />
      <ExclusifPost />
    </div>
  );
};

export default LandingPage;
