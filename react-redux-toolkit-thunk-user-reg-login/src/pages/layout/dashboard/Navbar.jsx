import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./AdminNavbar";
import UserNavbar from "./UserNavbar";

const Navbar = () => {
  const { token, user } = useSelector((state) => state.auth);
  switch (user?.role) {
    case "admin":
      return <AdminNavbar token={token} user={user} />;
    default:
      return <UserNavbar token={token} user={user} />;
  }
};

export default Navbar;
