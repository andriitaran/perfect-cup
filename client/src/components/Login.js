import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProfileLogo from "../assets/icons/profile_logo.svg";

class Login extends Component {
  handleLogin = event => {
    event.preventDefault();
    axios({
      method: "post",
      url: `/user/login`,
      data: {
        email: event.target.email.value,
        password: event.target.password.value
      }
    }).then(response => {
      sessionStorage.setItem("authToken", response.data);
      window.location.href = "/prepare";
    });
  };

  render() {
    return (
      <section className="login">
        <div className="login-container">
          <span className="login-container__header">Login</span>
          <form
            className="login-container__form"
            action="submit"
            onSubmit={this.handleLogin}
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
            <button className="login-container__form--login" type="submit">
              Login
            </button>
          </form>
          <Link to="/register">
            <img className="login-container__cup" src={ProfileLogo} />
            <span className="login-container__register">
              Sign up with email
            </span>
          </Link>
        </div>
      </section>
    );
  }
}

export default Login;
