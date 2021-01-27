import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProfileLogo from "../../assets/icons/profile_logo.svg";
import "./login.styles.scss"

const {REACT_APP_BACKEND_URL, REACT_APP_PORT} = process.env;

export const Login = () => {

  const [error, setError] = useState("");
  
  const handleLogin = async event => {
    event.preventDefault();
    try {
      const loginData = await axios({
        method: "post",
        url: `${REACT_APP_BACKEND_URL}:${REACT_APP_PORT}/user/login`,
        data: {
          email: event.target.email.value,
          password: event.target.password.value
        }
      })
      sessionStorage.setItem("authToken", loginData.data.token);
      sessionStorage.setItem("name", loginData.data.user);
      window.location.href = "/prepare";
    } catch(err) {
      setError(err.response.data)
    }
  };

    return (
      <section className="login">
        <div className="login-container">
          <span className="login-container__header">Login</span>
          <form
            className="login-container__form"
            action="submit"
            onSubmit={handleLogin}
          >
            <label className="login-container__form--email" for="email">
              Email
            </label>
            <input
              className="login-container__form--email-input"
              type="email"
              id="email"
              name="email"
              required
            />

            <label className="login-container__form--password" for="password">
              Password
            </label>
            <input
              className="login-container__form--password-input"
              type="password"
              id="password"
              name="password"
              required
            />
            <div className="login-container__form--error">        {error && (
            <span className="login-container__form--error" key={error}>Error: {error}</span>)}</div>
            <button className="login-container__form--login" type="submit">
              Login
            </button>
          </form>
          <Link to="/register">
            <img className="login-container__cup" src={ProfileLogo} alt="Logo" />
            <span className="login-container__register">
              Sign up with email
            </span>
          </Link>
        </div>
      </section>
    );
}

