import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import PourOverLogo from "../assets/images/498476-coffee/svg/010-coffee-pot-1.svg";
import FrenchPressLogo from "../assets/images/498476-coffee/svg/023-kettle.svg";

export default class Brew extends Component {
  state = {
    selectedBrew: {},
    loading: false
  };

  componentDidMount() {
    axios({
      method: "get",
      url: `http://localhost:5000/data`,
      headers: { "Access-Control-Allow-Origin": "*" }
    }).then(res => {
      const brew = res.data.find(brew => {
        return brew.id === this.props.match.params.id;
      });
      this.setState({
        selectedBrew: brew
      });
    });
  }

  render() {
    let image;
    let method;
    if (this.state.selectedBrew.method === "pourover") {
      image = (
        <div className="brew-container__circle">
          <img
            className="brew-container__circle--img"
            src={PourOverLogo}
            alt="method"
          />
        </div>
      );
      method = "Pour Over";
    } else {
      image = (
        <div className="brew-container__circle">
          <img
            className="brew-container__circle--img-frenchpress"
            src={FrenchPressLogo}
            alt="method"
          />
        </div>
      );
      method = "French Press";
    }

    let reccomendations;
    if (
      this.state.selectedBrew.notes === "Coffee was too strong & bitter" &&
      this.state.selectedBrew.ratio === 18
    ) {
      reccomendations =
        "Try lowering the ratio to 1:17 and increasing grind size";
    } else if (
      this.state.selectedBrew.notes === "Coffee was too strong & bitter"
    ) {
      reccomendations = "Try lowering the ratio and increasing grind size";
    } else if (this.state.selectedBrew.notes === "Coffee was bitter") {
      reccomendations = "Try lowering the ratio";
    } else if (this.state.selectedBrew.notes === "Coffee was too strong") {
      reccomendations = "Try a coarser grind size";
    } else if (this.state.selectedBrew.notes === "Coffee was too weak") {
      reccomendations = "Try a finer grind size";
    } else if (this.state.selectedBrew.notes === "Coffee was PERFECT!") {
      reccomendations = "You made a PERFECT CUP!";
    } else {
      reccomendations = "You didn't provide any feedback";
    }

    return (
      <section className="brew">
        <div className="brew-container">
          <span className="brew-container__header">My Brew</span>
          {image}
          <div className="brew-container__brewinfo">
            <span className="brew-container__brewinfo--date">
              Date :{" "}
              {moment(`${this.state.selectedBrew.date}`).format(
                "MMMM Do, YYYY"
              )}
            </span>
            <span className="brew-container__brewinfo--time">
              Time : {moment(`${this.state.selectedBrew.date}`).format("LT")}
            </span>
            <span className="brew-container__brewinfo--method">
              Method : {method}
            </span>
            <span className="brew-container__brewinfo--ratio">
              Ratio : {this.state.selectedBrew.ratio}
            </span>
            <span className="brew-container__brewinfo--grind">
              Grind Size : {this.state.selectedBrew.grind}
            </span>
            <span className="brew-container__brewinfo--coffee">
              Ground Coffee Amount : {this.state.selectedBrew.coffee}
            </span>
            <span className="brew-container__brewinfo--water">
              Water Amount : {this.state.selectedBrew.water}
            </span>
            <span className="brew-container__brewinfo--notes">
              Notes : "{this.state.selectedBrew.notes}"
            </span>
            <span className="brew-container__brewinfo--reccomendations">
              Reccomendations : "{reccomendations}"
            </span>
          </div>
        </div>
      </section>
    );
  }
}
