import React from "react";
import SignUpForm from "../features/Forms/SignUpForm";
import { useContext } from "react";
import DataContext from "../Context/DataContext";
// This is the sign up page
const SignUp = () => {
  const { signUp, setSignUp, fetchSignUp } = useContext(DataContext);

  return (
    <div className="signUp">
      <h2 className="text-dark sign-up-heading text-3xl font-bold ">
        Please Sign Up
      </h2>
      {/* Here I add the sign up form component */}
      {/* And pass the necessary props  */}
      <SignUpForm
        details={signUp}
        setDetails={setSignUp}
        handleSubmit={fetchSignUp}
      />
    </div>
  );
};

export default SignUp;
