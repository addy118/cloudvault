import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center text-xl font-bold">
      <img src={logo} alt="AppName Logo" className="mr-2 h-8 w-8" />
      <span className="">CloudVault</span>
    </Link>
  );
}
