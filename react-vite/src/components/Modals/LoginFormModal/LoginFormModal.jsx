import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { thunkLogin } from "../../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { validateLogInForm } from "../validation";
import "../Modals.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateLogInForm(email, password);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setPassword("");
      return;
    }

    const user = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (user.errors) {
      setErrors(user.errors);
      setPassword("");
    } else {
      closeModal();
      navigate(`/users/${user.id}`)
    }
  };

  const logInDemoUser = async (e) => {
    e.preventDefault();

    const user = await dispatch(thunkLogin({
      email: "demo@aa.io",
      password: "password",
    }));

    closeModal();
    navigate(`/users/${user.id}`)
  }

  return (
    <div id="login-form-container">
      <form onSubmit={handleSubmit}>
        <h1 id="signup-login-heading">Log In</h1>
        <div className="field-container">
          <div className="form-label-container">
            <label className="log-in-label" htmlFor="email">
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
            <label className="log-in-label" htmlFor="password">
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
        <button className="submit-button" type="submit">Log In</button>
        <button className="demo-user-button" type="submit" onClick={logInDemoUser}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
