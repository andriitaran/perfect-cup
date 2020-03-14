// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import BottomNavigation from "@material-ui/core/BottomNavigation";
// import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
// import RestoreIcon from "@material-ui/icons/Restore";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import LocationOnIcon from "@material-ui/icons/LocationOn";

// const useStyles = makeStyles({
//   root: {
//     width: 414
//   }
// });

// export default function Navigation() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   return (
//     <BottomNavigation
//       value={value}
//       onChange={(event, newValue) => {
//         setValue(newValue);
//       }}
//       showLabels
//       className={classes.root}
//     >
//       <BottomNavigationAction label="Prepare" icon={<RestoreIcon />} />
//       <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
//       <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
//     </BottomNavigation>
//   );
// }

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Prepare from "../assets/images/498476-coffee/svg/027-tea-pot.svg";
import Profile from "../assets/images/1461633-coffee/svg/009-app.svg";
import Discover from "../assets/images/498476-coffee/svg/001-coffee-shop-1.svg";
import BottomNavigation from "@material-ui/core/BottomNavigation";

export default class Navigation extends Component {
  render() {
    return (
      <section className="navigation">
        <div className="navigation__buttons">
          <Link to="/">
            <div className="navigation__buttons--prepare">
              <img src={Prepare} alt="prepare" />
              <span>Prepare</span>
            </div>
          </Link>
          <Link to="/profile">
            <div className="navigation__buttons--profile">
              <img src={Profile} alt="my profile" />
              <span>Profile</span>
            </div>
          </Link>
          <Link to="/">
            <div className="navigation__buttons--discover">
              <img src={Discover} alt="discover" />
              <span>Discover</span>
            </div>
          </Link>
        </div>
      </section>
    );
  }
}
