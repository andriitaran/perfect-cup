import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import ProfileLogo from "../../assets/icons/profile_logo.svg";
import PourOverLogo from "../../assets/images/498476-coffee/svg/010-coffee-pot-1.svg";
import FrenchPressLogo from "../../assets/images/498476-coffee/svg/023-kettle.svg";
import "./profile.styles.scss"

const {REACT_APP_BACKEND_URL, REACT_APP_PORT} = process.env;

export const Profile = () => {

  const [brews, setBrews] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${REACT_APP_BACKEND_URL}:${REACT_APP_PORT}/data`,
      headers: {
        "auth-token": `${sessionStorage.getItem("authToken")}`,
        "Access-Control-Allow-Origin": "*"
      }
    }).then(res => {
      let brewData = res.data;
      brewData.sort((a, b) => (b.date > a.date ? 1 : a.date > b.date ? -1 : 0));
      setBrews(brewData)
    });
  })

  const myBrews = () =>
    brews.map(brew => {
      let image;
      if (brew.method === "pourover") {
        image = (
          <img
            className="profile-container__brew--method"
            src={PourOverLogo}
            alt="method"
          />
        );
      } else {
        image = (
          <img
            className="profile-container__brew--method"
            src={FrenchPressLogo}
            alt="method"
          />
        );
      }
      return (
        <Link to={`/profile/brews/${brew._id}`} key={brew._id}>
          <div className="profile-container__brew">
            <span className="profile-container__brew--date">
              {moment(`${brew.date}`).format("MMMM Do, YYYY")}
            </span>
            <span className="profile-container__brew--time">
              {moment(`${brew.date}`).format("LT")}
            </span>
            {image}
          </div>
        </Link>
      );
    });



      return (
        <section className="profile">
          <div className="profile-container">
            <span className="profile-container__header">My Profile</span>
            <div className="profile-container__circle">
              <img
                className="profile-container__circle--img"
                src={ProfileLogo}
                alt="profile"
              />
            </div>
            <span className="profile-container__brews">My Brews</span>
            <div className="profile-container__placeholders">
              <span className="profile-container__placeholders--date">
                Date
              </span>
              <span className="profile-container__placeholders--time">
                Time
              </span>
              <span className="profile-container__placeholders--method">
                Method
              </span>
            </div>
            <section className="profile-container__mybrews">
              {myBrews()}
            </section>
          </div>
        </section>
      );
}
