import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Menu from "./Menu";
import Basket from "./Basket";
import { useContext } from "react";
import DataContext from "../../Context/DataContext";
import { useSelector } from "react-redux";

// This is the header component
const Header = () => {
  // Import all of the states from the DataContext
  const { basketItems, setBasketItems, setBooksList, fetchPopBooks } =
    useContext(DataContext);

  const [menu, setMenu] = useState(false);
  const [basket, setBasket] = useState(false);
  // import the redux state
  const loggedIn = useSelector((state) => state.books.loggedIn);
  const popularBooks = useSelector((state) => state.books.popularBooks);
  const navigate = useNavigate();

  return (
    <header className="flex-container header-container ">
      {/* menu bars icon */}
      <FontAwesomeIcon
        onClick={() => setMenu((prev) => !prev)}
        className="menu-bars"
        icon={faBars}
      />
      {/* menu component */}
      <Menu loggedIn={loggedIn} menu={menu} setMenu={setMenu} />
      <span
        onClick={() => {
          navigate("/");
          setBooksList([]);
          if (!popularBooks[0].length) fetchPopBooks();
        }}
      >
        <h3 className={!loggedIn ? "logo" : "logo-logged"}>JustRead</h3>
      </span>
      {/* Here I used ternary to display the welcome when the user has logged in*/}
      <nav className="nav">
        <ul className="nav-list flex-container">
          <NavLink className="nav-element" to={"/"}></NavLink>
          <NavLink className="nav-element" to={"/login"}>
            {/* Here I used ternary to display the link when the user is loggedOut*/}
            {loggedIn ? "" : "Login"}
          </NavLink>
          {/* Here I used ternary to display the link when the user is loggedOut*/}
          {!loggedIn ? (
            <NavLink className="nav-element" to={!loggedIn ? "/signUp" : "/"}>
              SignUp
            </NavLink>
          ) : (
            ""
          )}
          {/* Here I used ternary to display the icon when the user is loggedIn*/}
          {loggedIn ? (
            <FontAwesomeIcon
              onClick={() => setBasket((prev) => !prev)}
              className="menu-bars basket"
              icon={faShoppingBasket}
            />
          ) : (
            ""
          )}
          {/* Basket component */}
          <Basket
            basketItems={basketItems}
            setBasketItems={setBasketItems}
            basket={basket}
            setBasket={setBasket}
          />
          {/* Here I used ternary to display the icon when the user is loggedIn*/}
          {loggedIn ? (
            <div className={basketItems.length ? "number-of-books" : "hide"}>
              <span onClick={() => setBasket((prev) => !prev)} className="span">
                {basketItems.length ? basketItems.length : ""}
              </span>
            </div>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
