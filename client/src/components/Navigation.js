import React, { Component } from "react";
import { Link } from "react-router-dom";
import Prepare from "../assets/icons/prepare_grey.svg";
import Profile from "../assets/icons/profile_grey.svg";
import Discover from "../assets/icons/discover_grey.svg";

export default class Navigation extends Component {
  render() {
    return (
      <section className="navigation">
        <div className="navigation__container">
          <div className="navigation__buttons">
            <Link to="/prepare">
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
            <Link to="/discover">
              <div className="navigation__buttons--discover">
                <img src={Discover} alt="discover" />
                <span>Discover</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
