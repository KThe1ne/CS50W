import React from "react";
import { Link } from "react-router-dom";

const PAGEURLS = {
  Home: "/",
  Portfolio: "/portfolio",
  Profile: "/profile",
  "Sign Out": "/signout",
};

function NavItem(props) {
  return (
    <Link to={PAGEURLS[props.title]} className="hover:text-green-500">
      <div className="py-2 hover:pt-0">{props.title}</div>
    </Link>
  );
}

export default NavItem;
