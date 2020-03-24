import React, { Component } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import axios from "axios";
import Logo from "../assets/images/498476-coffee/svg/001-coffee-shop-1.svg";
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
      url: `http://localhost:5000/shops`,
      headers: { "Access-Control-Allow-Origin": "*" }
    }).then(res => {
      console.log(res.data);
      this.setState({
        shops: res.data,
        loading: true
      });
    });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.selectedShop !== nextState.selectedShop;
  // }

  Map = () => {
    return (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 49.28273, lng: -123.120735 }}
        defaultOptions={{ styles: mapStyles }}
      >
        {this.state.shops.map(shop => (
          <Marker
            key={shop.recordid}
            position={{
              lat: shop.lat,
              lng: shop.lng
            }}
            onClick={() => {
              this.setState({
                selectedShop: shop
              });
            }}
            icon={{
              url: "https://image.flaticon.com/icons/svg/90/90619.svg",
              scaledSize: new window.google.maps.Size(25, 25)
            }}
          />
        ))}
        {this.state.selectedShop && (
          <InfoWindow
            className="info-window"
            position={{
              lat: this.state.selectedShop.lat,
              lng: this.state.selectedShop.lng
            }}
            onCloseClick={() => {
              this.setState({
                selectedShop: null
              });
            }}
          >
            <div className="discover-container__map--window">
              <img
                className="discover-container__map--window-img"
                src={this.state.selectedShop.image}
              />
              <span className="discover-container__map--window-header">
                {this.state.selectedShop.name}
              </span>
              <span className="discover-container__map--window-address">
                {this.state.selectedShop.address}
              </span>
              <span className="discover-container__map--window-hours">
                {this.state.selectedShop.hours}
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
