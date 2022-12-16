import {
  ArchiveIcon,
  BookOpenIcon,
  MusicNoteIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import logo from "../../logo.jpeg";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { logout } from "../../core/redux/auth/authActions";
import ProfileImg from "../../images/profile.png";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import { GET_POSTS } from "../../constants/apiEndpoints";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AppLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [othersPosts, setOthersPosts] = useState([]);
  let navigate = useNavigate();
  const handleLogout = () => {
    logout(dispatch);
    navigate("/");
  };
  const userNavigation = [{ name: "Mon Profile", href: "/my/profile" }];
  const adminNavigation = [
    { name: "Mes articles", href: "/my/posts" },
    { name: "Utilisateurs", href: "/my/users" },
  ];

  useEffect(async () => {
    const response = await FetchWrapper.get(`${GET_POSTS}tags?tags=islam`);
    console.log(response);
    setOthersPosts(response);
  }, []);

  return (
    <div className="flex">
      <div className="flex flex-col p-2 bg-gray-100">
        <Link
          className="flex flex-col items-center px-4 py-2 rounded-lg hover:bg-gray-200 mb-4"
          to="/"
        >
          <img src={logo} className="w-8 h-8 rounded-full object-contain" />
        </Link>
        <Link
          className="flex flex-col items-center px-4 py-2 rounded-lg hover:bg-gray-200"
          to="/posts"
        >
          <ArchiveIcon className="w-6 h-6" />
          <span>Articles</span>
        </Link>
        <Link
          className="flex flex-col items-center px-4 py-2 rounded-lg hover:bg-gray-200"
          to="/videos"
        >
          <VideoCameraIcon className="w-6 h-6" />
          <span>Videos</span>
        </Link>
        <Link
          className="flex flex-col items-center px-4 py-2 rounded-lg hover:bg-gray-200"
          to="/books"
        >
          <BookOpenIcon className="w-6 h-6" />
          <span>Livres</span>
        </Link>
        <Link
          className="flex flex-col items-center px-4 py-2 rounded-lg hover:bg-gray-200"
          to="/songs"
        >
          <MusicNoteIcon className="w-6 h-6" />
          <span>Musics</span>
        </Link>
      </div>
      <div className="flex-1">
        <Outlet />
        <Footer />
      </div>
      <div className="px-4">
        <div className="w-full flex items-center h-16 justify-center">
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="bg-green-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-green-800 rounded-full flex items-center text-sm focus:outline-none">
                      <span className="sr-only">Open user menu</span>
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
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-green-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                      {adminNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-green-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={handleLogout}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Déconnexion
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <a
                  className="flex items-center px-3 text-white"
                  href="/auth/login"
                >
                  {/* <FontAwesomeIcon className="Icon" icon={faUser} /> */}
                  Se connecter
                </a>
                <a
                  className="flex items-center rounded-full px-3 text-green-500 bg-white hover:bg-green-100 hover:shadow"
                  href="/auth/register"
                >
                  {/* <FontAwesomeIcon className="Icon" icon={faUser} /> */}
                  S'Inscrire
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="my-5">
          <div className="hidden md:block flex-1">
            <h1 className="py-4 text-sm font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Autres articles
            </h1>
            <div className="m-2">
              {othersPosts?.map((post) => (
                <Link
                  key={post._id}
                  to={`/posts/${post._id}`}
                  className="flex items-center space-x-4 my-6 overflow-hidden"
                >
                  <img
                    className="h-[80px] w-[80px] rounded border"
                    src={post.coverPicture}
                  />
                  <div>
                    <h1 className="truncate">{post.title}</h1>
                    <p className="mb-5 text-gray-400 text-xs truncate">
                      {post.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
