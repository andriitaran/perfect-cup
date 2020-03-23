import React, { Component } from "react";
import { Link } from "react-router-dom";

import PourOverLogo from "../assets/images/498476-coffee/svg/010-coffee-pot-1.svg";
import FrenchPressLogo from "../assets/images/498476-coffee/svg/023-kettle.svg";

export default class Selection extends Component {
  render() {
    return (
      <section className="selection">
        <div className="selection-container">
          <span className="selection-container__header">
            Choose Brewing Method
          </span>
          <Link to="/prepare/pourover">
            <div className="selection-container__pourover">
              <img
                className="selection-container__pourover--img"
                src={PourOverLogo}
                alt="pour over"
              />
              <span className="selection-container__pourover--text">
                Pour Over
              </span>
            </div>
          </Link>
          <Link to="/prepare/frenchpress">
            <div className="selection-container__frenchpress">
              <img
                className="selection-container__frenchpress--img"
                src={FrenchPressLogo}
                alt="french press"
              />
              <span className="selection-container__frenchpress--text">
                French Press
              </span>
            </div>
          </Link>
        </div>
      </section>
    );
  }
}
