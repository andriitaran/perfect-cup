import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  handleRegister = event => {
    event.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:5000/user/register`,
      data: {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value
      }
    }).then(response => {
      console.log("Registered!");
      window.location.href = "/login";
    });
  };
  render() {
    return (
      <section className="register">
        <div className="register-container">
          <span className="register-container__header">Register</span>
          <form
            className="register-container__form"
            action="submit"
            onSubmit={this.handleRegister}
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
            <button
              className="register-container__form--register"
              type="submit"
            >
              Register
            </button>
          </form>
          <Link to="/login">
            <button className="register-container__login">Login</button>
          </Link>
        </div>
      </section>
    );
  }
}

export default Register;
