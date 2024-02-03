import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkLogin, thunkSignup } from "../../../redux/session";
import { validateSignUpForm } from "../validation";

import "../Modals.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateSignUpForm(firstName, lastName, email, username, password, confirmPassword);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const serverResponse = await dispatch(
      thunkSignup({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const logInDemoUser = async (e) => {
    e.preventDefault();

    await dispatch(thunkLogin({
      email: "demo@aa.io",
      password: "password",
    }));

    closeModal();
  }

  return (
    <div id="sign-up-form-container">
      <form id="sign-up-form" onSubmit={handleSubmit}>
        <h1 id="signup-login-heading">Sign Up</h1>
        {errors.server && <p>{errors.server}</p>}
        <div className="field-container">
          <div className="form-label-container">
            <label className="sign-up-label" htmlFor="first-name">
              First Name*
            </label>
            <div className="error-container">
              {errors.first_name && <span className="error-message">{errors.first_name}</span>}
            </div>
          </div>
          <input
            id="first-name"
            className="input"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (errors.first_name) {
                const newErrors = { ...errors };
                delete newErrors.first_name;
                setErrors(newErrors);
              }
            }}
          />
        </div>

        <div className="field-container">
          <div className="form-label-container">
            <label className="sign-up-label" htmlFor="last-name">
              Last Name*
            </label>
            <div className="error-container">
              {errors.last_name && <span className="error-message">{errors.last_name}</span>}
            </div>
          </div>
          <input
            id="last-name"
            className="input"
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (errors.last_name) {
                const newErrors = { ...errors };
                delete newErrors.last_name;
                setErrors(newErrors);
              }
            }}
          />
        </div>

        <div className="field-container">
          <div className="form-label-container">
            <label className="sign-up-label" htmlFor="email">
              Email*
            </label>
            <div className="error-container">
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>
          <input
            id="email"
            className="input"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                const newErrors = { ...errors };
                delete newErrors.email;
                setErrors(newErrors);
              }
            }}
          />
        </div>

        <div className="field-container">
          <div className="form-label-container">
            <label className="sign-up-label" htmlFor="username">
              Username*
            </label>
            <div className="error-container">
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>
          </div>
          <input
            id="username"
            className="input"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) {
                const newErrors = { ...errors };
                delete newErrors.username;
                setErrors(newErrors);
              }
            }}
          />
        </div>

        <div className="field-container">
          <div className="form-label-container">
            <label className="sign-up-label" htmlFor="password">
              Password*
            </label>
            <div className="error-container">
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
          </div>
          <input
            id="password"
            className="input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                const newErrors = { ...errors };
                delete newErrors.password;
                setErrors(newErrors);
              }
            }}
          />
        </div>

        <div className="field-container">
          <div className="form-label-container">
            <label className="sign-up-label" htmlFor="confirm-password">
              Confirm Password*
            </label>
            <div className="error-container">
              {errors.confirm_password && <span className="error-message">{errors.confirm_password}</span>}
            </div>
          </div>
          <input
            id="confirm-password"
            className="input"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirm_password) {
                const newErrors = { ...errors };
                delete newErrors.confirm_password;
                setErrors(newErrors);
              }
            }}
          />

        </div>
        <button className="submit-button" type="submit">Sign Up</button>
        <button className="demo-user-button" type="submit" onClick={logInDemoUser}>Demo User</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
