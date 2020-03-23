import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import ProfileLogo from "../assets/icons/profile_logo.svg";
// import ProfileLogo from "../assets/images/498476-coffee/svg/008-coffee-cup-2.svg";
import PourOverLogo from "../assets/images/498476-coffee/svg/010-coffee-pot-1.svg";
import FrenchPressLogo from "../assets/images/498476-coffee/svg/023-kettle.svg";

export default class Profile extends Component {
  state = {
    brews: [],
    loading: false
  };

  componentDidMount() {
    axios({
      method: "get",
      url: `http://localhost:5000/data`,
      headers: { "Access-Control-Allow-Origin": "*" }
    }).then(res => {
      console.log(res.data);
      this.setState({
        brews: res.data,
        loading: true
      });
    });
  }

  mybrews = () =>
    this.state.brews.map(brew => {
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
        <Link to={`/profile/brews/${brew.id}`} key={brew.id}>
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

  render() {
    if (this.state.loading) {
      return (
        <section className="profile">
          <div className="profile-container">
            {/* <Link to="/">
              <img
                className="profile-container__close"
                src={Close}
                alt="close"
              />
            </Link> */}

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
              {this.mybrews()}
            </section>
          </div>
        </section>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}
