import React from "react";
import "../../styles/common/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="nav" className="navbar navbar-expand-lg navbar-dark px-4">
      <Link className="navbar-brand" to="#">
        Simplify
      </Link>

      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home <span className="sr-only">(current)</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
