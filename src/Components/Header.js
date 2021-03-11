import React from "react";
import { NavLink, BrowserRouter } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
      {/* <a className="navbar-brand">Movies</a> */}
      <BrowserRouter>
        <NavLink to="" className="navbar-brand">
          Movies
        </NavLink>
      </BrowserRouter>
    </nav>
  );
};

export default Header;
