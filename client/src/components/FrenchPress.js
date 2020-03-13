import React, { Component } from "react";
import { Link } from "react-router-dom";
import FrenchPressLogo from "../assets/images/498476-coffee/svg/023-kettle.svg";
import Back from "../assets/images/back.svg";

export default class FrenchPress extends Component {
  render() {
    return (
      <section className="frenchpress">
        <div className="frenchpress-container">
          <Link to="/">
            <img
              className="frenchpress-container__close"
              src={Back}
              alt="back"
            />
          </Link>
          <div className="frenchpress-container__circle">
            <img
              className="frenchpress-container__circle--img"
              src={FrenchPressLogo}
              alt="french press"
            />
          </div>

          <span className="frenchpress-container__tap-text">
            TAP TO CHANGE DOSE
          </span>
          <section className="frenchpress-container__selection">
            <div className="frenchpress-container__selection--grind">
              <span>Medium</span>
            </div>

            <div className="frenchpress-container__selection--coffee">
              <span>13g</span>
            </div>

            <div className="frenchpress-container__selection--water">
              <span>220ml</span>
            </div>
            <div className="frenchpress-container__placeholders">
              <span>Grind Size</span>
              <span>Ground Coffee</span>
              <span>Water</span>
            </div>
          </section>
        </div>
      </section>
    );
  }
}
