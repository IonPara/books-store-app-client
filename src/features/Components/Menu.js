import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// menu component
const Menu = ({ menu, setMenu }) => {
  // here is the redux state
  const loggedIn = useSelector((state) => state.books.loggedIn);

  const navigate = useNavigate();
  return (
    <div className={menu ? "menu flex-column" : "hide"}>
      <div>
        {/* here are the menu bars icon */}
        <FontAwesomeIcon
          onClick={() => setMenu((prev) => !prev)}
          className="menu-bars"
          icon={faBars}
        />
      </div>
      <div
        // if the user is loggedIn navigate to user link otherwise navigate to login
        onClick={() => {
          loggedIn ? navigate("/user") : navigate("/login");
          setMenu((prev) => !prev);
        }}
        className="mt-5 my-profile"
      >
        <h4>My Profile</h4>
      </div>
    </div>
  );
};

export default Menu;
