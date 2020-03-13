import React, { Component } from "react";
import { Link } from "react-router-dom";
import Prepare from "../assets/images/498476-coffee/svg/027-tea-pot.svg";
import Profile from "../assets/images/1461633-coffee/svg/009-app.svg";
import Discover from "../assets/images/498476-coffee/svg/001-coffee-shop-1.svg";

export default class Navigation extends Component {
  render() {
    return (
      <section className="navigation">
        <div className="navigation__buttons">
          <Link to="/">
            <div className="navigation__buttons--prepare">
              <img src={Prepare} alt="prepare" />
              <span>Prepare</span>
            </div>
          </Link>
          <Link to="/profile">
            <div className="navigation__buttons--profile">
              <img src={Profile} alt="my profile" />
              <span>Profile</span>
            </div>
          </Link>
          <Link to="/">
            <div className="navigation__buttons--discover">
              <img src={Discover} alt="discover" />
              <span>Discover</span>
            </div>
          </Link>
        </div>
      </section>
    );
  }
}
