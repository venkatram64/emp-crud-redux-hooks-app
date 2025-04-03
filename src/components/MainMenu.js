import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const MainMenu = () => {
  const isHighlight = ({ isActive }) => ({
    backgroundColor: isActive ? "white" : "",
  });

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" style={isHighlight} to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" style={isHighlight} to="/employees">
              Employees
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" style={isHighlight} to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" style={isHighlight} to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default MainMenu;
