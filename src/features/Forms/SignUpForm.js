import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// This is bootstrap form component that is used to login and sign up
const SignUpForm = ({
  details,
  setDetails,
  handleSubmit,
  showConfirmPassword = true,
}) => {
  // This is useNavigate Hook that is used to navigate to a different page
  return (
    <Form
      onSubmit={(e) => handleSubmit(e)}
      className="signUp-form"
      encType="multipart/form-data"
    >
      <Form.Group
        className={showConfirmPassword ? '"mb-2"' : "hide"}
        controlId="photo"
      >
        <Form.Label>Photo</Form.Label>
        <Form.Control
          onChange={(event) => {
            setDetails({ ...details, photo: event.target.files[0] });
          }}
          name="photo"
          type="file"
          accept=".png, .jpg, .jpeg"
        />
      </Form.Group>
      {/* Here is the name section, I used ternary to hide this section for the login page  */}
      <Form.Group
        className={showConfirmPassword ? "mb-2 mt-2" : "hide"}
        controlId="Name"
      >
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={details.name}
          onChange={(event) => {
            setDetails({ ...details, name: event.target.value });
          }}
          type="text"
          placeholder="Name"
          required={showConfirmPassword ? true : false}
        />
      </Form.Group>
      {/* Here is the email section */}
      <Form.Group className="mb-2 mt-2" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={details.username}
          onChange={(event) => {
            setDetails({ ...details, username: event.target.value });
          }}
          type="email"
          placeholder="Enter email"
          required
        />
        {/* Here is the password section */}
      </Form.Group>
      <Form.Group className="mb-2" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={details.password}
          onChange={(event) => {
            setDetails({ ...details, password: event.target.value });
          }}
          type="password"
          minLength={6}
          placeholder="Password"
          required
        />
      </Form.Group>
      {/* Here is the confirm password section, I used ternary to hide this section for the login page  */}
      <Form.Group
        className={showConfirmPassword ? "mb-2" : "hide mb-2"}
        controlId="formBasicConfirmPassword"
      >
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          value={details.confirmPassword}
          onChange={(event) => {
            setDetails({ ...details, confirmPassword: event.target.value });
          }}
          type="password"
          placeholder="Confirm Password"
          required={showConfirmPassword ? true : false}
        />
      </Form.Group>{" "}
      {/* Here I used ternary to navigate to the main page when the button is clicked */}
      <Button variant="primary" type="submit">
        Submit
      </Button>{" "}
    </Form>
  );
};

export default SignUpForm;
