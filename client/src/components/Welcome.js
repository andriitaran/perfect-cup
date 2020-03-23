import React, { Component, Fragment } from "react";
import PerfectCup from "../assets/icons/perfect_cup_white.svg";
import Video from "../assets/video/video.mp4";

export default class Welcome extends Component {
  state = {
    renderLogo: false,
    renderTitle: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ renderLogo: true, renderTitle: true });
    }, 6000);
  }

  renderMainScreen = () =>
    setTimeout(() => {
      window.location.href = "/prepare";
    }, 14000);

  render() {
    this.renderMainScreen();
    return (
      <section className="welcome">
        <div className="welcome-container">
          <video
            autoPlay="autoplay"
            loop="loop"
            muted
            className="welcome-container__video"
          >
            <source src={Video} type="video/mp4" />
          </video>
          {this.state.renderLogo && (
            <>
              <img
                className="welcome-container__logo"
                src={PerfectCup}
                alt="perfect cup"
              />
              <span className="welcome-container__header">Perfect Cup</span>
            </>
          )}
        </div>
      </section>
    );
  }
}
