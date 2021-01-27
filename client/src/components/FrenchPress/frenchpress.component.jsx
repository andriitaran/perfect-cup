import React, { Component } from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import uuid from "uuid";
import axios from "axios";
import Select from "@material-ui/core/Select";
import FrenchPressLogo from "../../assets/images/498476-coffee/svg/023-kettle.svg";
import Back from "../../assets/images/back.svg";
import "react-circular-progressbar/dist/styles.css";
import { easeLinear } from "d3-ease";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { AnimatedProgressProvider } from "../AnimatedProgressProvider/animatedProgressProvide.component";
import "../../styles/brewing.scss"

const {REACT_APP_BACKEND_URL, REACT_APP_PORT} = process.env;

export default class FrenchPress extends Component {
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
      feedback: '',
    };
   
    myTimeout = null;

    FEEDBACK_TYPES = ['strong', 'bitter', 'weak', 'perfect'];
  
  setSteps = () => {

    if (this.myTimeout != null) {
      clearTimeout(this.myTimeout);
    }

    const step1 = "Let's brew some coffee!";
    const step2 = `Put 
    ${this.coffeeAmount()} g
    of coffee into filter`;
    const step3 = `Pour ${this.state.waterAmount}g of water`;
    const step4 = "Wait for 4 minutes for coffee to brew";
    const step5 =
      "Using tablespoon, stir the crust that formed on top of the coffee";
    const step6 = "Let coffee brew for another 5 minutes";
    const step7 =
      "Put the plunger and press it down until it reaches the top of the coffee";
    const step8 = "Serve and enjoy!";
    const arr = [
      // THIS IS CORRECT DATA, USING 1s INTERVALS INSTEAD FOR DEMO PURPOSES
      // { text: step1, time: 5000 },
      // { text: step2, time: 15000 },
      // { text: step3, time: 15000 },
      // { text: step4, time: 240000 },
      // { text: step5, time: 10000 },
      // { text: step6, time: 300000 },
      // { text: step7, time: 10000 },
      // { text: step8, time: 5000 }
      { text: step1, time: 1000 },
      { text: step2, time: 1000 },
      { text: step3, time: 1000 },
      { text: step4, time: 1000 },
      { text: step5, time: 1000 },
      { text: step6, time: 1000 },
      { text: step7, time: 1000 },
      { text: step8, time: 1000 }
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
    let run = () => {
      if (stepNum < this.state.brewingSteps.length) {
        this.setState({
          animating: true,
          brewingStep: this.state.brewingSteps[stepNum].text,
          brewingStepDuration: this.state.brewingSteps[stepNum].time
        });
        // step timeout
        this.myTimeout = setTimeout(() => {
          this.setState({
            animating: false
          });
          stepNum++;
          run();
        }, this.state.brewingSteps[stepNum].time);
      } else {
        clearTimeout(this.myTimeout);
        this.setState({
          feedback: true
        });
      }
    };

    if (this.state.brewingActive) {
      this.setState({
        brewingActive: false,
        animating: false
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
    let data = {
      id: uuid(),
      date: new Date(),
      method: "frenchpress",
      ratio: `1:${this.state.ratio}`,
      grind: "Coarse",
      coffee: `${this.coffeeAmount()}g`,
      water: `${this.state.waterAmount}g`,
      feedback: this.state.feedback,
    };
    try {
      axios({
        method: "post",
        url: `${REACT_APP_BACKEND_URL}:${REACT_APP_PORT}/data`,
        headers: {
          "auth-token": `${sessionStorage.getItem("authToken")}`,
          "Access-Control-Allow-Origin": "*"
        },
        data
      });
      console.log("brew data was uploaded");
      window.location.href = "/profile";
    } catch (err) {
      console.log(err)
    }
  };

  handleFeedback = feedback => {
    this.setState({
      feedback
    })
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
        if (duration > 0) {
          counter = millisToMinutesAndSeconds(duration * 1000);
        } else {
          clearInterval(duration);
        }
      }, 1000);

    countdown();

    this.state.brewingActive ? (activeClass = "active") : (activeClass = "");
    return (
      <section className="brewing">
        <div
          className={`brewing-container ${
            this.state.animating === true ? activeClass : ""
          }`}
        >
          <Link to="/prepare">
            <img
              className="brewing-container__close"
              src={Back}
              alt="back"
            />
          </Link>

          <div
            className={`brewing-container__circle ${
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
              className={`brewing-container__circle--img-frenchpress ${
                this.state.animating === true ? activeClass : ""
              }`}
              src={FrenchPressLogo}
              alt="french press"
            />
          </div>

          {!this.state.feedback ? (
            <>
              <span
                className={`brewing-container__tap-text ${
                  this.state.animating === true ? activeClass : ""
                }`}
              >
                TAP TO CHANGE DOSE
              </span>

              <section
                className={`brewing-container__selection ${
                  this.state.animating === true ? activeClass : ""
                }`}
              >
                <div className="brewing-container__selection--grind">
                  <span>Medium</span>
                </div>

                <div className="brewing-container__selection--coffee">
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

                <div className="brewing-container__selection--water">
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
                <div className="brewing-container__placeholders">
                  <span>Grind Size</span>
                  <span>Ground Coffee</span>
                  <span>Water</span>
                </div>
              </section>
              <span
                className={`brewing-container__steps--header ${
                  this.state.animating === true ? activeClass : ""
                }`}
              >
                STEPS
              </span>

              <div className="brewing-container__steps">
                <ul className="brewing-container__steps--instructions">
                  <li>{`Put 
    ${this.coffeeAmount()} g
    of coffee into filter`}</li>
                  <li>{`Pour ${this.state.waterAmount}g of water`}</li>
                  <li>Wait for 4 minutes for coffee to brew</li>
                  <li>
                    Using tablespoon, stir the crust that formed on top of the
                    coffee
                  </li>
                  <li>
                    Put the plunger and press it down until it reaches the top
                    of the coffee
                  </li>
                  <li>Serve and enjoy!</li>
                </ul>
              </div>
            </>
          ) : (
            <section className="sizing"></section>
          )}

          <section className={`brewing-container__brewing ${activeClass}`}>
            {!this.state.feedback ? (
              <span className="brewing-container__brewing--steps">
                {this.state.brewingStep}
              </span>
            ) : (
              <form
                className="feedback-brew"
                onSubmit={this.handleSubmit}
              >
                <span className="feedback-brew__header">
                  How was your coffee?
                </span>

                { this.FEEDBACK_TYPES.map((feedback) => {
                  return (
                    <button
                      className={`feedback-brew__${feedback} ${
                        this.state.feedback === feedback ? activeClass : ""
                      }`}
                      key={feedback}
                      type="button"
                      onClick={this.handleFeedback.bind(this, feedback)}
                    >
                      {feedback}
                    </button>
                  );              
                }) }

                <button className="feedback-brew__save" type="submit">
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
