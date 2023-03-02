import React from "react";
import BookCard from "../features/Components/Card";
import Search from "../features/Components/Search";
import { useContext } from "react";
import DataContext from "../Context/DataContext";
import { useSelector } from "react-redux";

// This is the to do page
const Main = () => {
  const {
    basketItems,
    setBasketItems,
    searchBook,
    setSearchBook,
    fetchBooks,
    booksList,
    addBook,
    addReview,
    handleDelete,
  } = useContext(DataContext);
  const popularBooks = useSelector((state) => state.books.popularBooks);
  return (
    <>
      <section>
        <div className="image ">
          <div className="search-container d-flex justify-center items-center">
            <Search
              searchBook={searchBook}
              setSearchBook={setSearchBook}
              fetchBooks={fetchBooks}
            />
          </div>
        </div>
      </section>
      <main className="books-container ">
        {
          <BookCard
            basketItems={basketItems}
            setBasketItems={setBasketItems}
            booksList={
              (booksList.length && booksList[0]) || !popularBooks[0].length
                ? booksList
                : popularBooks
            }
            addBook={addBook}
            addReview={addReview}
            handleDelete={handleDelete}
          />
        }
      </main>
    </>
  );
};

export default Main;
