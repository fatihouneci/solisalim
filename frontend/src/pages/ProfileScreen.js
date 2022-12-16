import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileScreen = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center space-x-4 mt-[100px]">
        <Link to="/avatar/update">
          {user.profile.profilePicture === "" ? (
            <div className="flex items-center justify-center h-12 w-12 rounded-full border-2 uppercase font-bold">
              {user.profile.initials}
            </div>
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
            <h2 className="text-4xl mb-2">{user.profile.fullName}</h2>
            <p className="text-gray-400 mb-2">{user.profile.username}</p>
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
    </div>
  );
};

export default ProfileScreen;
