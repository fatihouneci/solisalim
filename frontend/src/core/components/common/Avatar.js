import React from "react";

const Avatar = ({ user }) => {
  return (
    <div className="flex items-center justify-center px-4 first:pt-0 last:pb-0 cursor-pointer hover:opacity-70">
      {user?.profilePicture ? (
        <div className="relative">
          <img
            className="h-10 w-10 rounded-full"
            src="{user.profile.profilePicture}"
            alt=""
          />
          {user?.status === true ? (
            <span className="absolute top-0 right-0 w-2 h-2 bg-gray-300 rounded-full"></span>
          ) : (
            <span className="absolute top-0 right-0 w-2 h-2 bg-green-600 rounded-full"></span>
          )}
        </div>
      ) : (
        <div className="relative">
          <div className="flex items-center justify-center h-20 w-20 rounded-full border-2 text-3xl font-bold">
            {user?.initials}
          </div>
          {user?.status === true ? (
            <span className="absolute top-0 right-0 w-2 h-2 bg-gray-300 rounded-full"></span>
          ) : (
            <span className="absolute top-0 right-0 w-2 h-2 bg-green-600 rounded-full"></span>
          )}
        </div>
      )}
    </div>
  );
};

export default Avatar;
