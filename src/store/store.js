import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/booksReducer";

// The configureStore function will automatically set up an empty store
// with the relevant settings needed.
export default configureStore({
  reducer: {
    books: booksReducer,
  },
});
