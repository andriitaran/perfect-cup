import React from "react";
import { NavLink } from "react-router-dom";
import "./navigation.styles.scss"

export const Navigation = () => {
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
