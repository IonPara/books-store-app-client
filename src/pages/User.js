import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditDetails from "../features/Forms/EditDetails";
import { useContext } from "react";
import DataContext from "../Context/DataContext";
import { useSelector } from "react-redux";
import emptyPicture from "../images/empty-picture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faAddressCard,
  faSliders,
  faGears,
} from "@fortawesome/free-solid-svg-icons";

// User component
const User = () => {
  // Import the states from data context
  const { handleEdit, setSignUp, signUp } = useContext(DataContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showForm, setShowForm] = useState(false);
  // import the redux state
  const user = useSelector((state) => state.books.user);

  const navigate = useNavigate();

  // reverse the ordered array
  const ordered = user ? user.ordered.map((item) => item) : null;
  const reversedArray = user ? ordered.reverse() : null;

  const date = new Date();
  const dateToString = date.toString();
  return (
    // User container
    <main className="user-main flex-centered">
      <section className="user-details ">
        <div className="image-and-details">
          <div className="user-photo">
            {/* user profile picture */}
            <img
              className="profile-picture"
              src={user && user.photo ? user.photo : emptyPicture}
              alt="The user"
            />
          </div>
          <ul className="list ">
            <li className="user-details-item">
              <FontAwesomeIcon className="mr-2" icon={faUser} />
              {user ? user.name : "name"}
            </li>
            <li className="user-details-item">
              <FontAwesomeIcon className="mr-2" icon={faEnvelope} />
              {user ? user.username : "username"}
            </li>
            <li className="user-details-item">
              <FontAwesomeIcon className="mr-2" icon={faAddressCard} />
              {user ? user.type : "user type"}
            </li>
            <li className="user-details-item">
              <button
                onClick={() => {
                  setShowForm((prev) => !prev);
                  setShowPassword(false);
                }}
                className="user-buttons w-28 h-10 rounded-2xl "
              >
                <FontAwesomeIcon className="mr-2" icon={faSliders} />
                Edit Details
              </button>
            </li>
            <li className="user-details-item">
              <button
                onClick={() => {
                  setShowPassword(true);
                  setShowForm((prev) => !prev);
                }}
                className="change-password user-buttons w-50 h-10  rounded-2xl "
              >
                <FontAwesomeIcon className="mr-2" icon={faGears} />
                Change Password
              </button>
            </li>
            {/* Edit password button */}
          </ul>
        </div>
        {/* Edit details button */}
        <div>{/* logout button */}</div>
      </section>
      <section className="orders">
        <ul className="d-flex">
          <li className="p-2 text-xl font-bold">Orders</li>
        </ul>
        <div className="d-flex orders-books-container ">
          {/* Orders table */}
          <table className="orders-table text-center">
            {/* headers */}
            <thead>
              <tr>
                <th className="h-16 text-2xl">#</th>
                <th className=" text-xl">Image</th>
                <th className=" text-xl">Title</th>
                <th className=" text-xl">Author</th>
                <th className="quantity text-xl">Quantity</th>
                <th className=" text-xl">Price</th>
                <th className=" date text-xl">Date</th>
              </tr>
            </thead>
            <tbody>
              {/* For every book in the array create a row and a cell for each property */}
              {user ? (
                reversedArray.map((book, index) => {
                  return (
                    <tr className="w-5" key={index}>
                      <th>{index + 1}</th>
                      <th>
                        <div className="orders-item-image">
                          <img src={book.image} alt="" />
                        </div>
                      </th>
                      <th className="title">{book.title}</th>
                      <th>{book.author}</th>
                      <th className="quantity">{book.quantity}</th>
                      <th>{book.price}</th>
                      <th className="date">
                        {book.ordered
                          ? book.ordered.substring(0, 10)
                          : dateToString.substring(0, 10)}
                      </th>
                    </tr>
                  );
                })
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <div className="edit-details absolute  ">
        {/* Edit details component */}
        <EditDetails
          showForm={showForm}
          setShowForm={setShowForm}
          showPassword={showPassword}
          handleEdit={handleEdit}
          setSignUp={setSignUp}
          signUp={signUp}
        />
      </div>
    </main>
  );
};

export default User;
