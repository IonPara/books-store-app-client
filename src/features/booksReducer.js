// Import "createSlice"
import { createSlice } from "@reduxjs/toolkit";

// Create a slice
export const booksSlice = createSlice({
  // This is the name of the slice of state
  name: "books",

  // Create the initial value object
  initialState: {
    nextId: 1,
    loggedIn: false,
    user: null,
    popularBooks: [[]],
    myBooks: [],
    quantity: 1,
    showBook: "",
  },

  // Here are the reducers that we will use to manipulate the initial state
  reducers: {
    // setLogin reducer
    setLogin: (state, action) => {
      state.loggedIn = action.payload;
    },

    // setUser reducer
    setUser: (state, action) => {
      state.user = action.payload;
    },

    // setUsername reducer
    setUsername: (state, action) => {
      state.user.username = action.payload;
    },

    // add popular book reducer
    addPopBook: (state, action) => {
      const {
        _id,
        title,
        author,
        description,
        pageCount,
        image,
        price,
        subtitle,
        saleability,
        review,
      } = action.payload;
      const book = {
        id: _id,
        volumeInfo: {
          title,
          subtitle,
          authors: [author],
          description,
          pageCount,
          imageLinks: {
            smallThumbnail: image,
          },
        },
        saleInfo: {
          saleability,
          retailPrice: {
            amount: price,
          },
        },
        review,
      };
      state.popularBooks[0].push(book);
    },

    // remove book reducer
    removeBook: (state, action) => {
      const newArray = state.popularBooks[0].filter(
        (book) => book.id !== action.payload
      );
      state.popularBooks[0] = newArray;
    },

    // add review reducer
    addReview: (state, action) => {
      const { id, name, comment } = action.payload;
      state.popularBooks[0].forEach((book) => {
        if (book.id === id) {
          book.review.push({ id: `id1${id}`, name, comment });
        }
      });
    },

    // set quantity reducer
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },

    // set my books reducer
    setMyBooks: (state, action) => {
      state.user.ordered.push(action.payload);
    },
    setShowBook: (state, action) => {
      state.showBook = action.payload;
    },
  },
});

// Export the actions from our counterSlice
export const {
  setLogin,
  addPopBook,
  addReview,
  setUser,
  setQuantity,
  setMyBooks,
  setUsername,
  removeBook,
  setShowBook,
} = booksSlice.actions;

// Export counterSlice reducer
export default booksSlice.reducer;
