import React from "react";
import { Outlet } from "react-router";
import Header from "../Header";

const AdminLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
