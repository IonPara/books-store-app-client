import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";

// Edit details component
const EditDetails = ({
  showPassword,
  showForm,
  setShowForm,
  handleEdit,
  setSignUp,
  signUp,
}) => {
  const [details, setDetails] = useState({
    photo: signUp.photo,
    name: signUp.name,
    username: signUp.username,
    newUsername: signUp.username,
    password: "",
    confirmPassword: "",
  });
  // const user = useSelector((state) => state.books.user);

  const navigate = useNavigate();

  return (
    <div>
      {/* Form component */}
      <Form
        onSubmit={(e) => {
          if (showPassword) {
            handleEdit(e, details, true);
          } else {
            handleEdit(e, details, null);
          }
          setSignUp({ ...signUp, username: details.username });
          navigate("/login");
          setShowForm(false);
        }}
        className={showForm ? "signUp-form" : "hide"}
      >
        {/* Close icon */}
        <FontAwesomeIcon
          onClick={() => setShowForm(false)}
          className="close-icon"
          icon={faSquareXmark}
        />
        <Form.Group
          className={!showPassword ? '"mb-3"' : "hide"}
          controlId="photo"
        >
          <Form.Label>New Picture</Form.Label>
          <Form.Control
            value={details.photo}
            onChange={(event) => {
              setDetails({ ...details, photo: event.target.value });
            }}
            name="photo"
            type="text"
            placeholder="Enter url"
          />
        </Form.Group>
        {/* Here is the name section, I used ternary to hide this section for the login page  */}
        <Form.Group
          className={!showPassword ? '"mt-3"' : "hide"}
          controlId="Name"
        >
          <Form.Label>New Name</Form.Label>
          <Form.Control
            value={details.name}
            onChange={(event) => {
              setDetails({ ...details, name: event.target.value });
            }}
            type="text"
            placeholder="Name"
            required={!showPassword ? true : false}
          />
        </Form.Group>
        {/* Here is the email section */}
        <Form.Group
          className={showPassword ? "hide" : "mb-3 mt-3"}
          controlId="formBasicEmail"
        >
          <Form.Label>New email address</Form.Label>
          <Form.Control
            value={details.newUsername}
            onChange={(event) => {
              setDetails({ ...details, newUsername: event.target.value });
            }}
            className={showPassword ? "hide" : "mb-3"}
            required={!showPassword ? true : false}
            type="email"
            placeholder="Enter email"
          />
          {/* Here is the password section */}
        </Form.Group>
        <Form.Group
          className={!showPassword ? "hide" : "mb-3"}
          required={!showPassword ? true : false}
          controlId="formBasicPassword"
        >
          <Form.Label> New Password</Form.Label>
          <Form.Control
            value={details.password}
            onChange={(event) => {
              setDetails({ ...details, password: event.target.value });
            }}
            type="password"
            minLength={6}
            placeholder="Password"
            className={!showPassword ? "hide" : "mb-3"}
            required={showPassword ? true : false}
          />
        </Form.Group>
        {/* Here is the confirm password section, I used ternary to hide this section for the login page  */}
        <Form.Group
          className={!showPassword ? "hide" : "mb-3"}
          required={!showPassword ? true : false}
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
            className={!showPassword ? "hide" : "mb-3"}
            required={showPassword ? true : false}
          />
        </Form.Group>{" "}
        <Button variant="primary" type="submit">
          Submit
        </Button>{" "}
      </Form>
    </div>
  );
};

export default EditDetails;
