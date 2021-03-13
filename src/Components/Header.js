import React from "react";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    // <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
    //   {/* <a className="navbar-brand">Movies</a> */}

    //   <NavLink to="" className="navbar-brand">
    //     Movies
    //   </NavLink>
    //   <NavLink to="/checkout" className="navbar-brand">
    //     asdasd
    //   </NavLink>
    // </nav>
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <NavLink to="" className="navbar-brand cWhite">
            Movies
          </NavLink>
        </ul>
        {props.cartData.length !== 0 ? (
          <NavLink to="/checkout" className="navbar-brand cWhite">
            <div className="row">
              <i
                className="fa fa-shopping-cart fa-2x mr-3 cWhite"
                aria-hidden="true"
              ></i>
              <h3 className="cWhite">{props.cartData.length}</h3>
            </div>
          </NavLink>
        ) : (
          <> </>
        )}
      </div>
    </nav>
  );
};

export default Header;
