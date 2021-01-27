import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProfileLogo from "../../assets/icons/profile_logo.svg";
import "./register.styles.scss"

const {REACT_APP_BACKEND_URL, REACT_APP_PORT} = process.env;

export const Register = () => {

  const [error, setError] = useState("");

  const handleRegister = async event => {
    event.preventDefault();
    try {
       await axios({
        method: "post",
        url: `${REACT_APP_BACKEND_URL}:${REACT_APP_PORT}/user/register`,
        data: {
          name: event.target.name.value,
          email: event.target.email.value,
          password: event.target.password.value
        }
      })
      window.location.href = "/login";
    } catch(err) {
      setError(err.response.data)
    }
  };

    return (
      <section className="register">
        <div className="register-container">
          <span className="register-container__header">Sign Up</span>
          <form
            className="register-container__form"
            action="submit"
            onSubmit={handleRegister}
            
          >
            <label className="register-container__form--name" for="name">
              Name
            </label>
            <input
              className="register-container__form--name-input"
              type="text"
              id="name"
              name="name"
              required
            />

            <label className="register-container__form--email" for="email">
              Email
            </label>
            <input
              className="register-container__form--email-input"
              type="email"
              id="email"
              name="email"
              required
            />

            <label
              className="register-container__form--password"
              for="password"
            >
              Password
            </label>
            <input
              className="register-container__form--password-input"
              type="password"
              id="password"
              name="password"
              required
            />
           <div className="login-container__form--error">        {error && (
            <span className="login-container__form--error" key={error}>Error: {error}</span>)}</div>
            <button
              className="register-container__form--register"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <Link to="/login">
            <img className="register-container__cup" src={ProfileLogo} alt="Logo"/>
            <span className="register-container__login">
              Got an account? Login here!
            </span>
          </Link>
        </div>
      </section>
    );
  
}


