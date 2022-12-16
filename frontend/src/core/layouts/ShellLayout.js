import {
  NewspaperIcon,
  ArchiveIcon,
  BookOpenIcon,
  LogoutIcon,
  MusicNoteIcon,
  UserIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import logo from "../../logo.jpeg";

import { logout } from "../redux/auth/authActions";
import ProfileImg from "../../images/profile.png";

const ShellLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  let navigate = useNavigate();
  const handleLogout = () => {
    logout(dispatch);
    navigate("/");
  };

  return (
    <div className="flex">
      <div className="flex flex-col justify-between p-2 bg-gray-100 sticky top-0 h-screen">
        <div>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-gray-200 flex flex-col items-center px-4 py-2 rounded-lg mb-4"
                : "flex flex-col items-center px-4 py-2 rounded-lg hover:bg-gray-200 mb-4"
            }
            to="/"
          >
            <img
              src={logo}
              alt=""
              className="w-8 h-8 rounded-full object-contain"
            />
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-gray-200 flex flex-col items-center px-4 py-2 rounded-lg mb-2"
                : "flex flex-col items-center px-4 py-2 rounded-lg hover:bg-gray-200 mb-2"
            }
            to="/posts"
          >
            <ArchiveIcon className="w-6 h-6" />
            <span className="text-xs">Articles</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-gray-200 flex flex-col items-center px-4 py-2 rounded-lg mb-2"
                : "flex flex-col items-center px-4 py-2 rounded-lg hover:bg-gray-200 mb-2"
            }
            to="/videos"
          >
            <VideoCameraIcon className="w-6 h-6" />
            <span className="text-xs">Videos</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-gray-200 flex flex-col items-center px-4 py-2 rounded-lg mb-2"
                : "flex flex-col items-center px-4 py-2 rounded-lg hover:bg-gray-200 mb-2"
            }
            to="/books"
          >
            <BookOpenIcon className="w-6 h-6" />
            <span className="text-xs">Livres</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-gray-200 flex flex-col items-center px-4 py-2 rounded-lg mb-2"
                : "flex flex-col items-center px-4 py-2 rounded-lg hover:bg-gray-200 mb-2"
            }
            to="/musics"
          >
            <MusicNoteIcon className="w-6 h-6" />
            <span className="text-xs">Audios</span>
          </NavLink>
        </div>
        <div>
          {user ? (
            <>
              <NavLink
                end
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 flex flex-col items-center px-4 py-2 rounded-lg mb-2"
                    : "flex flex-col items-center px-4 py-2 rounded-lg hover:bg-gray-200 mb-2"
                }
                to="/studio/posts"
              >
                <NewspaperIcon className="w-6 h-6" />
                <span className="text-xs text-center">Mes Articles</span>
              </NavLink>
              <NavLink
                end
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 flex flex-col items-center px-4 py-2 rounded-lg mb-2"
                    : "flex flex-col items-center px-4 py-2 rounded-lg hover:bg-gray-200 mb-2"
                }
                to="/studio/users"
              >
                <UserIcon className="w-6 h-6" />
                <span className="text-xs text-center">Utilisateurs</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 flex flex-col items-center px-4 py-2 rounded-lg mb-2"
                    : "flex flex-col items-center px-4 py-2 rounded-lg hover:bg-gray-200 mb-2"
                }
                to="/profile"
              >
                {user && user?.profile.profilePicture ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.profile.profilePicture}
                    alt=""
                  />
                ) : (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={ProfileImg}
                    alt=""
                  />
                )}
                <span className="text-xs">Profile</span>
              </NavLink>
              <button
                className="hover:bg-gray-200 flex flex-col items-center px-4 py-2 rounded-lg mb-2 mx-auto"
                onClick={handleLogout}
              >
                <LogoutIcon className="w-6 h-6" />
                {/* <span className="text-xs">Déconnexion</span> */}
              </button>
            </>
          ) : (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 flex flex-col items-center px-4 py-2 rounded-lg mb-2"
                  : "flex flex-col items-center px-4 py-2 rounded-lg hover:bg-gray-200 mb-2"
              }
              to="/auth/login"
            >
              <UserIcon className="w-6 h-6" />
              <span className="text-xs">Login</span>
            </NavLink>
          )}
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default ShellLayout;
