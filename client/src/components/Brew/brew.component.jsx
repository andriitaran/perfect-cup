import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import PourOverLogo from "../../assets/images/498476-coffee/svg/010-coffee-pot-1.svg";
import FrenchPressLogo from "../../assets/images/498476-coffee/svg/023-kettle.svg";
import "./brew.styles.scss"

const {REACT_APP_BACKEND_URL, REACT_APP_PORT} = process.env;

export const Brew = (props) => {

  const [selectedBrew, setSelectedBrew] = useState({});

  useEffect(() => {
    axios({
      method: "get",
      url: `${REACT_APP_BACKEND_URL}:${REACT_APP_PORT}/data`,
      headers: {
        "auth-token": `${sessionStorage.getItem("authToken")}`,
        "Access-Control-Allow-Origin": "*"
      }
    }).then(res => {
      const brew = res.data.find(brew => {
        return brew._id === props.match.params.id;
      });
      setSelectedBrew(brew)
    });
  })

  const getRecommendations = () => {
    const { feedback } = selectedBrew;
    const map = {
      strong: 'Try a coarser grind size',
      bitter: 'Try lowering the ratio',
      weak: 'Try a finer grind size',
      perfect: 'You made a PERFECT CUP!',
    };
  
    if (map[feedback]) {
      return map[feedback];
    }
  
    return "You didn't provide any feedback";
  }

  const getNotes = () => {
    const { feedback } = selectedBrew;
    const map = {
      strong: 'too strong',
      bitter: 'bitter',
      weak: 'too weak',
      perfect: 'PERFECT!',
    };
  
    if (map[feedback]) {
      return `Coffee was ${map[feedback]}`;
    }
  
    return "You didn't provide any feedback";
  }

  let image = "";
  let method = "";

  const getMethod = () => {

    if (selectedBrew.method === "pourover") {
      image = (
        <div className="brew-container__circle">
          <img
            className="brew-container__circle--img-pourover"
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
  }

  getMethod();
  
    return (
      <section className="brew">
        <div className="brew-container">
          <span className="brew-container__header">My Brew</span>
          {image}
          <div className="brew-container__brewinfo">
            <span className="brew-container__brewinfo--date">
              Date :{" "}
              {moment(`${selectedBrew.date}`).format(
                "MMMM Do, YYYY"
              )}
            </span>
            <span className="brew-container__brewinfo--time">
              Time : {moment(`${selectedBrew.date}`).format("LT")}
            </span>
            <span className="brew-container__brewinfo--method">
              Method : {method}
            </span>
            <span className="brew-container__brewinfo--ratio">
              Ratio : {selectedBrew.ratio}
            </span>
            <span className="brew-container__brewinfo--grind">
              Grind Size : {selectedBrew.grind}
            </span>
            <span className="brew-container__brewinfo--coffee">
              Ground Coffee Amount : {selectedBrew.coffee}
            </span>
            <span className="brew-container__brewinfo--water">
              Water Amount : {selectedBrew.water}
            </span>
            <span className="brew-container__brewinfo--notes">
              Notes : "{getNotes()}"
            </span>
            <span className="brew-container__brewinfo--reccomendations">
              Recommendations : "{getRecommendations()}"
            </span>
          </div>
        </div>
      </section>
    );
}
