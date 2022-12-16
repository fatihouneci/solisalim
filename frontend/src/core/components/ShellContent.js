import React from "react";
import { Outlet } from "react-router";

export default function ShellContent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
