import React from "react";
import { Link } from "react-router-dom";
import PourOverLogo from "../../assets/images/498476-coffee/svg/010-coffee-pot-1.svg";
import FrenchPressLogo from "../../assets/images/498476-coffee/svg/023-kettle.svg";
import "./prepare.styles.scss"

export const Prepare = () => {
    return (
      <section className="prepare">
        <div className="prepare-container">
          <span className="prepare-container__header">
            Let's brew some coffee, {sessionStorage.name}!
          </span>
          <Link to="/prepare/pourover">
            <div className="prepare-container__pourover">
              <img
                className="prepare-container__pourover--img"
                src={PourOverLogo}
                alt="pour over"
              />
              <span className="prepare-container__pourover--text">
                Pour Over
              </span>
            </div>
          </Link>
          <Link to="/prepare/frenchpress">
            <div className="prepare-container__frenchpress">
              <img
                className="prepare-container__frenchpress--img"
                src={FrenchPressLogo}
                alt="french press"
              />
              <span className="prepare-container__frenchpress--text">
                French Press
              </span>
            </div>
          </Link>
        </div>
      </section>
    );
}
