import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { FetchWrapper } from "../helpers/apiRequest";
import { GET_CATEGORIES } from "../constants/apiEndpoints";
import { useNavigate } from "react-router";
import ProfileImg from "../images/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../core/redux/auth/authActions";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [navigation, setNavigation] = useState([]);
  const httpRequest = FetchWrapper();

  useEffect(async () => {
    const response = await httpRequest.get(GET_CATEGORIES);
    setNavigation(response);
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Header;
