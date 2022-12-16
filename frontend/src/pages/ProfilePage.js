import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostList from "../components/studio/PostList";
import ProfileImg from "../images/profile.png";
import MyPostPage from "./post/MyPostPage";

const ProfilePage = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center space-x-4 bg-gray-100 p-[40px]">
        <Link to="/profile/avatar">
          {user.profile.profilePicture === "" ? (
            <img className="h-40 w-40 rounded-full" src={ProfileImg} alt="" />
          ) : (
            <img
              className="h-40 w-40 rounded-full"
              src={user.profile.profilePicture}
              alt=""
            />
          )}
        </Link>
        <div className="text-center">
          <div className="mb-5">
            <h2 className="text-4xl mb-2">
              {user.profile.firstName + " " + user.profile.lastName}
            </h2>
            <p className="text-gray-400 mb-2">{user.profile.email}</p>
            <p className="text-gray-400 mb-2">{user.profile.about_me}</p>
          </div>
          <div className="flex items-center justify-center space-x-2 my-2">
            <Link
              className="px-4 py-2 border border-blue-400 text-blue-400 rounded-full"
              to="/profile/update"
            >
              Modifier votre profile
            </Link>
          </div>
        </div>
      </div>
      {/* Mes articles */}
      <PostList />
    </div>
  );
};

export default ProfilePage;
