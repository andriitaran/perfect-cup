import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  handleLogin = event => {
    event.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:5000/user/login`,
      data: {
        email: event.email,
        password: event.password
      }
    }).then(response => {
      console.log("Logged in!");
      window.location.href = "/profile";
    });
  };

  render() {
    return (
      <>
        <span>Login</span>
        <form action="submit" onSubmit={this.handleLogin}>
          <div>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />

            <label for="password">Password</label>
            <input type="password" id="password" name="password" required />
            <button type="submit">Login</button>
          </div>
        </form>
        <Link to="/register">Register</Link>
      </>
    );
  }
}

export default Login;
