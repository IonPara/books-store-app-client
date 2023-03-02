import React from "react";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import BookDetails from "./BookDetails";

// Book card component
function BookCard({
  basketItems,
  setBasketItems,
  booksList,
  addBook,
  addReview,
  handleDelete,
}) {
  const [showCard, setShowCard] = useState("");
  const [showBook, setShowBook] = useState("");
  // Books container
  // For every book in the list, create a card
  return booksList.length && booksList[0] !== undefined
    ? // eslint-disable-next-line array-callback-return
      booksList[0].map((book, index) => {
        const volumeInfo = book.volumeInfo;
        let thumbnail = volumeInfo.imageLinks
          ? volumeInfo.imageLinks.smallThumbnail
          : undefined;
        let title = volumeInfo.title;
        let subtitle = volumeInfo.subtitle;
        let price =
          book.saleInfo.saleability === "FOR_SALE"
            ? book.saleInfo.retailPrice.amount
            : undefined;
        if (thumbnail && price) {
          return (
            <div className="card-container" key={index}>
              <Card
                onMouseOver={() => setShowCard(book.id)}
                onMouseOut={() => setShowCard("")}
                key={index}
                className="book-card"
              >
                <Card.Img
                  key={index + 200}
                  className="card-image"
                  variant="top"
                  src={thumbnail}
                />
                <Card.Body
                  onClick={() => setShowBook(book.id)}
                  key={index + 300}
                  className={showCard === book.id ? "card-body" : "hide"}
                >
                  <Card.Title key={index + 400} className="card-title">
                    {title}
                  </Card.Title>

                  <Card.Text key={index + 200}>{subtitle}</Card.Text>
                </Card.Body>
              </Card>
              {/* Book details component */}
              <BookDetails
                key={"123" + book.id}
                book={book}
                showBook={showBook}
                setShowBook={setShowBook}
                basketItems={basketItems}
                setBasketItems={setBasketItems}
                addBook={addBook}
                fetchReview={addReview}
                handleDelete={handleDelete}
              />
            </div>
          );
        }
      })
    : "";
}

export default BookCard;
