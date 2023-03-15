import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addReview,
  setQuantity,
  removeBook,
  setShowBook,
} from "../booksReducer";

// Book details component
const BookDetails = ({
  book,
  showBook,
  basketItems,
  setBasketItems,
  addBook,
  fetchReview,
  handleDelete,
}) => {
  // Here are the states
  const [comment, setComment] = useState("");
  const loggedIn = useSelector((state) => state.books.loggedIn);
  const user = useSelector((state) => state.books.user);
  const booksState = useSelector((state) => state.books.popularBooks[0]);
  const quantity = useSelector((state) => state.books.quantity);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Here are book's details
  const volumeInfo = book.volumeInfo;
  let thumbnail = volumeInfo.imageLinks.smallThumbnail;
  let title = volumeInfo.title;
  let author = volumeInfo.authors;
  let description = volumeInfo.description;
  let price = book.saleInfo.retailPrice.amount;
  let bookPrice = price * quantity;

  const findBook = (id) => {
    const book = booksState.find((book) => book.id === id);
    return book ? true : false;
  };

  // Handle click Hook
  const handleClick = (e) => {
    basketItems.length
      ? setBasketItems([
          ...basketItems,
          {
            id: book.id,
            title,
            quantity,
            price: bookPrice,
            author,
            image: thumbnail,
          },
        ])
      : setBasketItems([
          {
            id: book.id,
            title,
            quantity,
            price: bookPrice,
            author,
            image: thumbnail,
          },
        ]);
  };

  return (
    <div className="">
      <div
        onClick={() => {
          dispatch(setShowBook(""));
        }}
        className={
          showBook === book.id ? "close-book-details-container  " : "hide"
        }
      ></div>
      <div
        className={
          showBook === book.id
            ? " book-details-container animate__animated animate__fadeIn"
            : "hide"
        }
      >
        <div className="">
          {/* this is the x icon that will remove the book from the basket */}
          <FontAwesomeIcon
            onClick={() => {
              dispatch(setShowBook(""));
              dispatch(setQuantity(1));
            }}
            className="close-icon"
            icon={faSquareXmark}
          />
          <div className="book-details-and-image-container d-flex ">
            <div className="book-details-image-container ml-auto w-44 h-70 p-1 bd-dark">
              <img className="card-image" src={thumbnail} alt="thumbnail"></img>
            </div>
            <div className="ml-auto mt-auto mr-auto max-w-lg">
              <h4>{title}</h4>
              <p>{author}</p>
              <div className="bg-white opacity-90 text-black border-radius">
                <ul>
                  <li>Price: £{(price * quantity).toFixed(2)}</li>
                  <li>
                    <label className="mr-1">Quantity: </label>
                    {/* here is the quantity input */}
                    <input
                      value={quantity}
                      onChange={(e) => dispatch(setQuantity(e.target.value))}
                      className="w-7 "
                      type="number"
                      min="1"
                    />
                  </li>
                  <li>
                    {" "}
                    {/* Add to basket button */}
                    <Button
                      className="mr-3"
                      onClick={(e) => {
                        loggedIn ? handleClick(e) : navigate("/login");
                      }}
                      variant="primary"
                    >
                      ADD TO BASKET
                    </Button>
                  </li>{" "}
                  <br />
                  <li>
                    {" "}
                    {/* Add to main page button, if the user is of a admin type, show the button */}
                    {loggedIn && user.type === "admin" ? (
                      <Button
                        className="mr-3"
                        onClick={(e) => {
                          if (findBook(book.id)) {
                            console.log("yes");
                            handleDelete(book.id);
                            dispatch(removeBook(book.id));
                          } else {
                            addBook(e, book);
                          }
                        }}
                        variant="primary"
                      >
                        {findBook(book.id)
                          ? "REMOVE FROM MAIN PAGE"
                          : "ADD TO MAIN PAGE"}
                      </Button>
                    ) : (
                      ""
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className=" book-description mt-3 px-20 py-2  border-radius">
            <h3 className=" border-bottom-h "> Description</h3>
            <p className="text-lg">{description}</p>
          </div>
          <div className=" review-container mt-3 px-20 py-2 bg-white-smoke border-radius">
            {/* Review section */}
            <h3 className=" border-bottom-h mb-3">Reviews</h3>
            {book.review && book.review.length
              ? book.review.map((review, index) => {
                  return (
                    <div className="comment" key={index}>
                      <p className="review-name">{review.name}</p>
                      <p className="ml-5 italic">{review.comment}</p>
                    </div>
                  );
                })
              : // eslint-disable-next-line array-callback-return
                booksState.map((item) => {
                  if (item.review && item.id === book.id) {
                    return item.review.map((review, index) => {
                      return (
                        <div className="comment" key={index}>
                          <p className="review-name">{review.name}</p>
                          <p className="ml-5 italic">{review.comment}</p>
                        </div>
                      );
                    });
                  }
                })}
          </div>
          <div className="comment-form-container px-20 ml-auto mr-auto">
            <form className="max-w-lg ml-auto mr-auto  form mt-3">
              {/* Add review section */}
              <h4>Your review:</h4>
              <textarea
                className="textarea text-dark"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Comments"
              ></textarea>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (loggedIn) {
                    fetchReview(e, book, comment);
                    dispatch(
                      addReview({ id: book.id, comment, name: user.name })
                    );
                  } else {
                    navigate("/login");
                  }
                  setComment("");
                }}
              >
                Add Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
