import React, { Component, Fragment } from "react";

import PerfectCup from "../assets/images/498476-coffee/svg/008-coffee-cup-2.svg";

export default class Welcome extends Component {
  render() {
    return (
      <section className="welcome">
        <div className="welcome-container">
          <img
            className="welcome-container__logo"
            src={PerfectCup}
            alt="perfect cup"
          />
          <span className="welcome-container__header">Perfect Cup</span>
        </div>
      </section>
    );
  }
}
