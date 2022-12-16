import { BellIcon } from "@heroicons/react/outline";
import React from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../logo.jpeg";
import SearchForm from "./SearchForm";

export default function ShellHeader({ hasNavOpen, setHasNavOpen }) {
  const { user } = useSelector((state) => state.auth);
  const handleNavToggle = () => {
    setHasNavOpen(!hasNavOpen);
  };
  return (
    <div className="border-b flex items-center justify-between px-2 py-1">
      <div
        className="flex items-center space-x-3 px-2 py-2 cursor-pointer hover:bg-gray-200 rounded-lg"
        onClick={handleNavToggle}
      >
        {hasNavOpen ? (
          <AiOutlineMenuFold className="w-6 h-6" />
        ) : (
          <AiOutlineMenuUnfold className="w-6 h-6" />
        )}
        <img className="w-8 h-8 rounded-full object-contain" src={logo} />
        <h1 className="hidden md:block text-xl font-bold">SOLISALIM</h1>
      </div>
      <SearchForm />
      <div className="md:flex items-center space-x-2 hidden">
        {user ? (
          <>
            <NavLink
              className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100"
              to="/profile"
            >
              {user?.profile.profilePicture && (
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.profile.profilePicture}
                />
              )}
            </NavLink>
            <NavLink
              className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100"
              to="/notifications"
            >
              <BellIcon className="h-6 w-6" />
            </NavLink>
          </>
        ) : (
          <NavLink
            className="flex items-center space-x-1 p-2 rounded-lg bg-green-700 text-white hover:opacity-70"
            to="/notifications"
          >
            Connectez-vous
          </NavLink>
        )}
      </div>
    </div>
  );
}
