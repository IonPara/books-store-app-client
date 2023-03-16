import React from "react";
import { useContext } from "react";
import DataContext from "../Context/DataContext";
import uuid from "react-uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setMyBooks } from "../features/booksReducer";

// Checkout component
const Checkout = () => {
  // Use context states
  const { basketItems, setBasketItems, orderBook } = useContext(DataContext);
  let totalQuantity = 0;
  const dispatch = useDispatch();

  return (
    <div className=" checkout ">
      <ul className="checkout-list">
        <li className="d-flex justify-between font-bold">
          <span className="text-lg">Title</span>
          <div>
            <span className="text-lg mr-16">Quantity</span>
            <span className="text-lg mr-10">Price</span>
          </div>
        </li>
        {basketItems.map((item) => {
          totalQuantity += item.price;
          return (
            // /* For each item in the basket create list item  */
            <li className="checkout-item d-flex justify-between" key={uuid()}>
              <span className="text-base checkout-title">{item.title}</span>
              <div className="quantity-price-container d-flex justify-between ">
                <span className="text-base mr-20">{item.quantity} </span>
                <span className="text-base">£{item.price}</span>
                {/* remove icon */}
                <FontAwesomeIcon
                  onClick={() => {
                    setBasketItems(
                      basketItems.filter((elem) => elem.id !== item.id)
                    );
                  }}
                  className="ml-2 mr-3"
                  icon={faCircleXmark}
                />
              </div>
            </li>
          );
        })}
        <li className="font-bold d-flex justify-between">
          <div>Total:</div>
          <div className="mr-12">
            {basketItems.length ? `£${totalQuantity.toFixed(2)}` : "0"}
          </div>
        </li>
        <li>
          {/* Confirm order button */}
          <Button
            onClick={() => {
              basketItems.forEach((item) => {
                orderBook(item);
                dispatch(setMyBooks(item));
              });
            }}
            className=" pay-button mt-12"
          >
            Confirm Order
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Checkout;
