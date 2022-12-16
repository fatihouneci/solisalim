import React from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import logo from "../../logo.jpeg";
import {
  HomeIcon,
  ArchiveIcon,
  BookOpenIcon,
  MusicNoteIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
const NavItem = ({ closed, to, value, icon }) => {
  const classNames = `${
    closed
      ? " px-2 py-2 mx-auto hover:bg-green-500 hover:text-white rounded-lg mb-1"
      : "flex flex-1 space-x-3 items-center mb-1 px-4 py-2 rounded-lg hover:bg-gray-200"
  }`;
  const activeClasses = classNames + " bg-green-500 text-white";

  return (
    <NavLink
      className={({ isActive }) => (isActive ? activeClasses : classNames)}
      to={to}
    >
      {icon}
      <span className={`${closed ? "hidden" : ""}`}>{value}</span>
    </NavLink>
  );
};

export default function ShellNav({ hasNavOpen, setHasNavOpen }) {
  const handleNavToggle = () => {
    setHasNavOpen(!hasNavOpen);
  };
  return (
    <div
      className={`top-0 left-0 bottom-0 right-0 bg-white overflow-hidden ${
        hasNavOpen ? "absolute" : "hidden"
      }`}
    >
      <div className="px-2 py-1 fixed top-0 left-0 bottom-0 w-[300px] bg-gray-100 z-50">
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
          <h1 className="text-xl font-bold">SOLISALIM</h1>
        </div>
        <div className="flex flex-col p-4 w-full">
          <NavItem
            to="/"
            value="Accueil"
            icon={<HomeIcon className="w-6 h-6" />}
          />
          <NavItem
            to="/posts"
            value="Articles"
            icon={<ArchiveIcon className="w-6 h-6" />}
          />
          <NavItem
            to="/videos"
            value="Videos"
            icon={<VideoCameraIcon className="w-6 h-6" />}
          />
          <NavItem
            to="/books"
            value="Livres"
            icon={<BookOpenIcon className="w-6 h-6" />}
          />
          <NavItem
            to="/audios"
            value="Audios"
            icon={<MusicNoteIcon className="w-6 h-6" />}
          />
        </div>
      </div>
      <div
        onClick={handleNavToggle}
        className="fixed top-0 left-0 bottom-0 right-0 bg-gray-500 opacity-50 z-40"
      ></div>
    </div>
  );
}
