import React, { Component } from "react";
import "./styles/main.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Welcome from "./components/Welcome";
import Profile from "./components/Profile";
import Brew from "./components/Brew";
import Prepare from "./components/Prepare";
import PourOver from "./components/PourOver";
import FrenchPress from "./components/FrenchPress";
import Discover from "./components/Discover";
import Register from "./components/Register";
import Login from "./components/Login";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={props => <Welcome />} />
          <Route path="/register" exact render={props => <Register />} />
          <Route path="/login" exact render={props => <Login />} />
          <Route
            path="/prepare"
            exact
            render={props => (
              <>
                <Prepare />
                <Navigation />
              </>
            )}
          />
          <Route
            exact
            path="/profile"
            render={props => (
              <>
                <Profile />
                <Navigation />
              </>
            )}
          />
          <Route
            exact
            path="/profile/brews/:id"
            render={routerProps => (
              <>
                <Brew {...routerProps} />
                <Navigation />
              </>
            )}
          />
          <Route
            path="/prepare/pourover"
            render={props => (
              <>
                <PourOver />
                <Navigation />
              </>
            )}
          />
          <Route
            path="/prepare/frenchpress"
            render={props => (
              <>
                <FrenchPress />
                <Navigation />
              </>
            )}
          />
          <Route
            path="/discover"
            render={props => (
              <>
                <Discover />
                <Navigation />
              </>
            )}
          />
        </Switch>
      </Router>
    );
  }
}
