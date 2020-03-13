import React, { Component } from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PourOverLogo from "../assets/images/498476-coffee/svg/010-coffee-pot-1.svg";
import Back from "../assets/images/back.svg";

export default class PourOver extends Component {
  state = {
    waterAmount: 220, // choose 220ml, 300ml or 350ml
    ratio: 17, // choose 1:16, 1:17 or 1:18
    coffeeActive: false,
    waterActive: false,
    brewingActive: false,
    brewingSteps: [],
    brewingStep: ""
  };

  setSteps = () => {
    const step1 = `Put 
    ${this.coffeeAmount()} g
    of coffee into filter`;
    const step2 = `Pour ${this.bloom()}g of water until all the grounds are evenly saturated`;
    const step3 = "Wait 30 seconds for coffee to “bloom”";
    const step4 = `Pour remaining ${this.remainingWaterAmount()}g of water in circular motion`;
    const step5 = "Give brewer a gentle swirl";
    const step6 = "Let the water drain through and serve";
    const arr = [
      { text: step1, time: 1000 },
      { text: step2, time: 3000 },
      { text: step3, time: 3000 },
      { text: step4, time: 3000 },
      { text: step5, time: 3000 },
      { text: step6, time: 3000 }
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
    let timer;
    let run = () => {
      if (stepNum < this.state.brewingSteps.length) {
        timer = setTimeout(() => {
          this.setState({
            brewingStep: this.state.brewingSteps[stepNum].text
          });
          stepNum++;
          run();
        }, this.state.brewingSteps[stepNum].time);
      } else {
        clearTimeout(timer);
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

  coffeeAmount = () => (this.state.waterAmount / this.state.ratio).toFixed();

  bloom = () => this.coffeeAmount() * 2;

  remainingWaterAmount = () => this.state.waterAmount - this.bloom();

  render() {
    let activeClass;
    this.state.brewingActive ? (activeClass = "active") : (activeClass = "");
    return (
      <section className="pourover">
        <div className="pourover-container">
          <Link to="/">
            <img className="pourover-container__close" src={Back} alt="back" />
          </Link>
          <div className="pourover-container__circle" onClick={this.setSteps}>
            <img
              className="pourover-container__circle--img"
              src={PourOverLogo}
              alt="pour over"
            />
          </div>

          <span className="pourover-container__tap-text">
            TAP TO CHANGE DOSE
          </span>

          <section className="pourover-container__selection">
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

          <span className="pourover-container__steps--header">STEPS</span>
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

          <section className={`pourover-container__brewing ${activeClass}`}>
            <span>{this.state.brewingStep}</span>
          </section>
        </div>
      </section>
    );
  }
}
