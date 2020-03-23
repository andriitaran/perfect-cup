import React, { Component } from "react";
import "./styles/main.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Welcome from "./components/Welcome";
import Profile from "./components/Profile";
import Brew from "./components/Brew";
import Selection from "./components/Selection";
import PourOver from "./components/PourOver";
import FrenchPress from "./components/FrenchPress";
import Discover from "./components/Discover";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <>
                <Welcome />
              </>
            )}
          />
          <Route
            path="/prepare"
            exact
            render={props => (
              <>
                <Selection />
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
            path="/pourover"
            render={props => (
              <>
                <PourOver />
                <Navigation />
              </>
            )}
          />
          <Route
            path="/frenchpress"
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
