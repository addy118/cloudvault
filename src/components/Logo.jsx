import React from "react";
import logo from "../assets/react.svg";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center text-xl font-bold">
      <img
        src={logo || "/placeholder.svg"}
        alt="CloudVault Logo"
        className="mr-2 h-8 w-8"
      />
      <span className="text-[#FFD369]">CloudVault</span>
    </Link>
  );
}
