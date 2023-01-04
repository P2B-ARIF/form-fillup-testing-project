import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="max_width">
        <div className="nav_content">
        <h3>BDERP</h3>
        <ul>
          <li>
            <a to={"/"}> Home</a>
          </li>
          <li>
            <a to={"/"}> Service</a>
          </li>
          <li>
            <a to={"/"}> About</a>
          </li>
          <li>
            <a to={"/"}> Contact Us</a>
          </li>
        </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
