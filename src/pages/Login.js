import React from "react";
import SignUpForm from "../features/Forms/SignUpForm";
import { useContext } from "react";
import DataContext from "../Context/DataContext";
// This is the login page
const Login = () => {
  const { signUp, setSignUp, fetchLogin } = useContext(DataContext);

  return (
    <div className="login">
      <h2 className="text-dark">Please Login</h2>
      {/* Here I add the sign up form component */}
      {/* And pass the necessary props  */}
      <SignUpForm
        details={signUp}
        setDetails={setSignUp}
        handleSubmit={fetchLogin}
        showConfirmPassword={false}
      />
    </div>
  );
};

export default Login;
