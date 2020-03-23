import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Prepare from "../assets/icons/prepare_grey.svg";
import Profile from "../assets/icons/profile_grey.svg";
import Discover from "../assets/icons/discover_grey.svg";

export default class Navigation extends Component {
  render() {
    return (
      <section className="navigation">
        <div className="navigation__container">
          <div className="navigation__buttons">
            <NavLink to="/prepare">
              <div className="navigation__buttons--prepare">
                <div className="navigation__buttons--prepare-img"></div>
                <span>Prepare</span>
              </div>
            </NavLink>
            <NavLink to="/profile">
              <div className="navigation__buttons--profile">
                <div className="navigation__buttons--profile-img"></div>
                <span>Profile</span>
              </div>
            </NavLink>
            <NavLink to="/discover">
              <div className="navigation__buttons--discover">
                <div className="navigation__buttons--discover-img"></div>
                <span>Discover</span>
              </div>
            </NavLink>
          </div>
        </div>
      </section>
    );
  }
}
