import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Create a search component
const Search = ({ searchBook, setSearchBook, fetchBooks }) => {
  return (
    // search form
    <form
      className="flex-column"
      onSubmit={(e) => {
        fetchBooks(e);
        setSearchBook("");
      }}
    >
      {/* <label className="mb pt-0">Find Your Favorite Book </label> */}
      <div className="input-container">
        <input
          maxLength={140}
          className="input"
          id="input"
          type="text"
          name="value"
          placeholder="Find Your Favorite Book"
          // Set the state of the input to its value
          onChange={(e) => setSearchBook(e.target.value)}
          value={searchBook}
        />
        {/* search icon */}
        <FontAwesomeIcon
          onClick={(e) => {
            fetchBooks(e);
            setSearchBook("");
          }}
          className="search-icon"
          icon={faSearch}
        />
      </div>
      {/* Add a button that will be disabled when the input field is empty */}
    </form>
  );
};

export default Search;
