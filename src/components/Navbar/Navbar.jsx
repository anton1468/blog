import React from "react";
import { Link } from "react-router-dom";
import "materialize-css";
const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link to="/">Blog</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/">All posts</Link>
            </li>
            <li>
              <Link to="/createpost">Create post</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
