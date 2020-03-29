import React, { Component } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import axios from "axios";
import Logo from "../assets/icons/discover.svg";
import mapStyles from "./mapStyles";

const API_KEY = "AIzaSyDLHZ1Lo_XuPCfpADmL7kaPQBg0IRLR6oE";

class Discover extends Component {
  state = {
    shops: [],
    loading: false,
    selectedShop: null
  };

  componentDidMount() {
    axios({
      method: "get",
      url: `/shops`,
      headers: { "Access-Control-Allow-Origin": "*" }
    }).then(res => {
      console.log(res.data);
      this.setState({
        shops: res.data,
        loading: true
      });
    });
  }

  titleCase = str => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  };

  Map = () => {
    return (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 49.28273, lng: -123.120735 }}
        defaultOptions={{ styles: mapStyles }}
      >
        {this.state.shops.map(shop => (
          <Marker
            key={shop._id}
            position={{
              lat: shop.geom.coordinates[1],
              lng: shop.geom.coordinates[0]
            }}
            onClick={() => {
              this.setState({
                selectedShop: shop
              });
            }}
            icon={{
              url: `${Logo}`,
              scaledSize: new window.google.maps.Size(25, 25)
            }}
          />
        ))}
        {this.state.selectedShop && (
          <InfoWindow
            className="info-window"
            position={{
              lat: this.state.selectedShop.geom.coordinates[1],
              lng: this.state.selectedShop.geom.coordinates[0]
            }}
            onCloseClick={() => {
              this.setState({
                selectedShop: null
              });
            }}
          >
            <div className="discover-container__map--window">
              <img
                alt="marker"
                className="discover-container__map--window-img"
                src={this.state.selectedShop.image}
              />
              <span className="discover-container__map--window-header">
                {this.state.selectedShop.businesstradename}
              </span>
              <span className="discover-container__map--window-address">
                {this.state.selectedShop.house +
                  " " +
                  this.titleCase(this.state.selectedShop.street)}
              </span>
              <span className="discover-container__map--window-hours">
                7AM - 8PM
              </span>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  };

  WrappedMap = withScriptjs(withGoogleMap(this.Map));

  render() {
    return (
      <section className="discover">
        <div className="discover-container">
          <span className="discover-container__header">Discover</span>
          <span className="discover-container__text">
            Our Currated List of Speciality Coffee Shops Near You
          </span>
          {this.state.loading && (
            <div className="discover-container__map">
              <this.WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
              />
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default Discover;
