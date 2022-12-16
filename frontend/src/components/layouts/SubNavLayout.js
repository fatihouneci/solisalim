import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const SubNavLayout = () => {
  return (
    <>
      <div>
        <div className="flex items-center space-x-4 bg-gray-100">
          <div className="max-w-7xl mx-auto py-2">
            <div className="flex items-center space-x-3">
              <Link className="px-4 py-4" to="videos">
                Vidéos
              </Link>
              {/* <Link className="px-4 py-4" to="videos">
                Livres
              </Link>
              <Link className="px-4 py-4" to="videos">
                Musics
              </Link> */}
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default SubNavLayout;
