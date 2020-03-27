import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
  render() {
    return (
      <>
        <span>Register</span>
        <form action="/register" method="POST">
          <div>
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required />

            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />

            <label for="password">Password</label>
            <input type="password" id="password" name="password" required />
            <button type="submit">Register</button>
          </div>
        </form>
        <Link to="/login">Login</Link>
      </>
    );
  }
}

export default Register;
