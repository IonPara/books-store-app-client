import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Header from "./features/Components/Header";
import SignUp from "./pages/SignUp";
import Footer from "./features/Components/Footer";
import Login from "./pages/Login";
import User from "./pages/User";
import { DataProvider } from "./Context/DataContext";
import { useSelector } from "react-redux";
import Checkout from "./pages/Checkout";

function App() {
  // here is the loggedIn state
  const loggedIn = useSelector((state) => state.books.loggedIn);
  // Add the components to the app
  return (
    <div className="app-container">
      <DataProvider>
        <div className="app-container2 ">
          <Header />
          {/* Create the routes */}
          <Routes>
            {/* The route to the login and todo pages depending on the loggedIn state */}
            <Route path={"/"} element={<Main />} />
            {/* The route to the signup page */}
            <Route path="signUp" element={<SignUp />} />
            {loggedIn ? <Route path="user" element={<User />} /> : ""}
            <Route path="login" element={<Login />} />
            <Route path="checkout" element={<Checkout />} />
          </Routes>
        </div>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
