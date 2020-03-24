import React, { Component } from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import uuid from "uuid";
import axios from "axios";
import Select from "@material-ui/core/Select";
import PourOverLogo from "../assets/images/498476-coffee/svg/010-coffee-pot-1.svg";
import Back from "../assets/images/back.svg";
import "react-circular-progressbar/dist/styles.css";
import { easeLinear } from "d3-ease";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

export default class PourOver extends Component {
  state = {
    waterAmount: 220, // choose 220ml, 300ml or 350ml
    ratio: 17, // choose 1:16, 1:17 or 1:18
    coffeeActive: false,
    waterActive: false,
    brewingActive: false,
    brewingSteps: [],
    brewingStep: "",
    brewingStepDuration: 0,
    animating: false,
    feedback: false,
    strong: false,
    weak: false,
    bitter: false,
    perfect: false
  };

  setSteps = () => {
    const step1 = "Let's brew some coffee!";
    const step2 = `Put 
    ${this.coffeeAmount()} g
    of coffee into filter`;
    const step3 = `Pour ${this.bloom()}g of water until all the grounds are evenly saturated`;
    const step4 = "Wait 30 seconds for coffee to “bloom”";
    const step5 = `Pour remaining ${this.remainingWaterAmount()}g of water in circular motion`;
    const step6 = "Give brewer a gentle swirl";
    const step7 = "Let the water drain through and serve";
    const arr = [
      { text: step1, time: 5000 },
      { text: step2, time: 15000 },
      { text: step3, time: 15000 },
      { text: step4, time: 30000 },
      { text: step5, time: 60000 },
      { text: step6, time: 5000 },
      { text: step7, time: 30000 }
    ];

    this.setState(
      {
        brewingSteps: arr
      },
      () => this.startBrew()
    );
  };

  startBrew = () => {
    let stepNum = 0;
    let myTimeout;
    let run = () => {
      if (stepNum < this.state.brewingSteps.length) {
        this.setState({
          animating: true,
          brewingStep: this.state.brewingSteps[stepNum].text,
          brewingStepDuration: this.state.brewingSteps[stepNum].time
        });

        // step timeout
        myTimeout = setTimeout(() => {
          this.setState({
            animating: false
          });
          stepNum++;
          run();
        }, this.state.brewingSteps[stepNum].time);
      } else {
        clearTimeout(myTimeout);
        this.setState({
          feedback: true
        });
      }
    };

    if (this.state.brewingActive) {
      this.setState({
        brewingActive: false
      });
    } else {
      this.setState({
        brewingActive: true
      });
      run();
    }
  };

  handleChangeRatio = event => {
    let changed = !this.state.coffeeActive;
    this.setState({
      ratio: event.target.value,
      coffeeActive: changed
    });
  };

  handleChangeWaterAmount = event => {
    let changed = !this.state.waterActive;
    this.setState({
      waterAmount: event.target.value,
      waterActive: changed
    });
  };

  handleActiveWater = event => {
    this.setState({
      waterActive: true
    });
  };

  handleActiveCoffee = event => {
    this.setState({
      coffeeActive: true
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let brew = {
      id: uuid(),
      date: new Date(),
      method: "pourover",
      ratio: `1:${this.state.ratio}`,
      grind: "Medium",
      coffee: `${this.coffeeAmount()}g`,
      water: `${this.state.waterAmount}g`,
      notes: {
        bitter: this.state.bitter,
        strong: this.state.strong,
        weak: this.state.weak,
        perfect: this.state.perfect
      }
    };
    axios({
      method: "post",
      url: `http://localhost:5000/data`,
      data: {
        id: brew.id,
        date: brew.date,
        method: brew.method,
        ratio: brew.ratio,
        grind: brew.grind,
        coffee: brew.coffee,
        water: brew.water,
        notes: brew.notes
      }
    }).then(response => {
      console.log("brew data was uploaded");
      window.location.href = "/profile";
    });
  };

  handleBitter = event => {
    if (!this.state.bitter) {
      this.setState({
        bitter: true,
        perfect: false,
        weak: false
      });
    } else {
      this.setState({
        bitter: false
      });
    }
  };

  handleStrong = event => {
    if (!this.state.strong) {
      this.setState({
        strong: true,
        perfect: false,
        weak: false
      });
    } else {
      this.setState({
        strong: false
      });
    }
  };

  handleWeak = event => {
    if (!this.state.weak) {
      this.setState({
        weak: true,
        strong: false,
        bitter: false,
        perfect: false
      });
    } else {
      this.setState({
        weak: false
      });
    }
  };

  handlePerfect = event => {
    if (
      (!this.state.perfect && this.state.strong) ||
      this.state.bitter ||
      this.state.weak
    ) {
      this.setState({
        perfect: true,
        strong: false,
        bitter: false,
        weak: false
      });
    } else if (!this.state.perfect) {
      this.setState({
        perfect: true,
        strong: false,
        bitter: false,
        weak: false
      });
    } else {
      this.setState({
        perfect: false
      });
    }
  };

  coffeeAmount = () => (this.state.waterAmount / this.state.ratio).toFixed();

  bloom = () => this.coffeeAmount() * 2;

  remainingWaterAmount = () => this.state.waterAmount - this.bloom();

  render() {
    let activeClass;

    function millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    let duration = this.state.brewingStepDuration / 1000;
    let counter = millisToMinutesAndSeconds(this.state.brewingStepDuration);

    let countdown = () =>
      setInterval(() => {
        duration--;
        if (duration > 0 && duration < 10) {
          counter = "0:0" + duration;
        } else if (duration > 0 && duration <= 60) {
          counter = "0:" + duration;
        } else if (duration > 0 && duration > 60) {
          counter = "01:0" + (duration % 60);
        } else {
          clearInterval(duration);
        }
      }, 1000);

    countdown();

    this.state.brewingActive ? (activeClass = "active") : (activeClass = "");
    return (
      <section className="pourover">
        <div
          className={`pourover-container ${
            this.state.animating === true ? activeClass : ""
          }`}
        >
          <Link to="/prepare">
            <img className="pourover-container__close" src={Back} alt="back" />
          </Link>

          <div
            className={`pourover-container__circle ${
              this.state.animating === true ? activeClass : ""
            }`}
            onClick={this.setSteps}
          >
            {this.state.animating && (
              <AnimatedProgressProvider
                valueStart={0}
                valueEnd={100}
                duration={duration}
                easingFunction={easeLinear}
              >
                {value => {
                  return (
                    <CircularProgressbar
                      value={value}
                      text={`${counter}`}
                      styles={buildStyles({
                        pathTransition: "none",
                        trailColor: "333333",
                        pathColor: "ffa64d",
                        textColor: "d3d3d3"
                      })}
                    ></CircularProgressbar>
                  );
                }}
              </AnimatedProgressProvider>
            )}

            <img
              className={`pourover-container__circle--img ${
                this.state.animating === true ? activeClass : ""
              }`}
              src={PourOverLogo}
              alt="pour over"
            />
          </div>

          {!this.state.feedback ? (
            <>
              <span
                className={`pourover-container__tap-text ${
                  this.state.animating === true ? activeClass : ""
                }`}
              >
                TAP TO CHANGE DOSE
              </span>

              <section
                className={`pourover-container__selection ${
                  this.state.animating === true ? activeClass : ""
                }`}
              >
                <div className="pourover-container__selection--grind">
                  <span>Medium</span>
                </div>

                <div className="pourover-container__selection--coffee">
                  <FormControl
                    style={{
                      display: this.state.coffeeActive ? "block" : "none"
                    }}
                  >
                    <Select
                      value={this.state.ratio}
                      onChange={this.handleChangeRatio}
                    >
                      <MenuItem value={16}>1:16</MenuItem>
                      <MenuItem value={17}>1:17</MenuItem>
                      <MenuItem value={18}>1:18</MenuItem>
                    </Select>
                  </FormControl>
                  <span
                    style={{
                      display: this.state.coffeeActive ? "none" : "block"
                    }}
                    onClick={this.handleActiveCoffee}
                  >
                    {this.coffeeAmount()}g
                  </span>
                </div>

                <div className="pourover-container__selection--water">
                  <FormControl
                    style={{
                      display: this.state.waterActive ? "block" : "none"
                    }}
                  >
                    <Select
                      value={this.state.waterAmount}
                      onChange={this.handleChangeWaterAmount}
                    >
                      <MenuItem value={220}>220g</MenuItem>
                      <MenuItem value={300}>300g</MenuItem>
                      <MenuItem value={350}>350g</MenuItem>
                    </Select>
                  </FormControl>
                  <span
                    style={{
                      display: this.state.waterActive ? "none" : "block"
                    }}
                    onClick={this.handleActiveWater}
                  >
                    {this.state.waterAmount}g
                  </span>
                </div>
                <div className="pourover-container__placeholders">
                  <span>Grind Size</span>
                  <span>Ground Coffee</span>
                  <span>Water</span>
                </div>
              </section>
              <span
                className={`pourover-container__steps--header ${
                  this.state.animating === true ? activeClass : ""
                }`}
              >
                STEPS
              </span>

              <div className="pourover-container__steps">
                <ul className="pourover-container__steps--instructions">
                  <li>{`Put ${this.coffeeAmount()} g of coffee into filter`}</li>
                  <li>{`Pour ${this.bloom()}g of water until all the
              grounds are evenly saturated`}</li>
                  <li>Wait 30 seconds for coffee to “bloom</li>
                  <li>{`Pour remaining ${this.remainingWaterAmount()}g
              of water in circular motion`}</li>
                  <li>Give brewer a gentle swirl</li>
                  <li>Let the water drain through and serve</li>
                </ul>
              </div>
            </>
          ) : (
            <section className="sizing"></section>
          )}

          <section className={`pourover-container__brewing ${activeClass}`}>
            {!this.state.feedback ? (
              <span className="pourover-container__brewing--steps">
                {this.state.brewingStep}
              </span>
            ) : (
              <form className="feedback-pourover" onSubmit={this.handleSubmit}>
                <span className="feedback-pourover__header">
                  How was your coffee?
                </span>
                <button
                  className={`feedback-pourover__strong ${
                    this.state.strong ? activeClass : ""
                  }`}
                  type="button"
                  onClick={this.handleStrong}
                >
                  Strong
                </button>
                <button
                  className={`feedback-pourover__weak ${
                    this.state.weak ? activeClass : ""
                  }`}
                  type="button"
                  onClick={this.handleWeak}
                >
                  Weak
                </button>
                <button
                  className={`feedback-pourover__bitter ${
                    this.state.bitter ? activeClass : ""
                  }`}
                  type="button"
                  onClick={this.handleBitter}
                >
                  Bitter
                </button>
                <button
                  className={`feedback-pourover__perfect ${
                    this.state.perfect ? activeClass : ""
                  }`}
                  type="button"
                  onClick={this.handlePerfect}
                >
                  Perfect
                </button>
                <button className="feedback-pourover__save" type="submit">
                  Save
                </button>
              </form>
            )}
          </section>
        </div>
      </section>
    );
  }
}
