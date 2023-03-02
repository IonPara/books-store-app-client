import React from "react";
import Button from "react-bootstrap/Button";
import uuid from "react-uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

// Basket component
const Basket = ({ basket, setBasket, basketItems, setBasketItems }) => {
  const navigate = useNavigate();

  return (
    <div className={basket ? "basket-items" : "hide"}>
      <ul>
        <li className="mr-2">
          {!basketItems.length ? "The basket is empty" : ""}
        </li>
        {basketItems.map((item) => {
          return (
            <li className=" d-flex justify-between" key={uuid()}>
              <span className="text-base">{item.title}</span>
              <FontAwesomeIcon
                onClick={() => {
                  setBasketItems(
                    basketItems.filter((elem) => elem.id !== item.id)
                  );
                }}
                className="ml-2 mr-3"
                icon={faCircleXmark}
              />
            </li>
          );
        })}
      </ul>
      {!basketItems.length ? (
        ""
      ) : (
        <Button
          onClick={() => {
            navigate("/checkout");
            setBasket(false);
          }}
          className="proceed-btn"
        >
          Proceed
        </Button>
      )}
    </div>
  );
};

export default Basket;
