import React, { useEffect, useState } from "react";
import PerfectCup from "../../assets/icons/perfect_cup_main.svg";
import Video from "../../assets/video/video.mp4";
import "./welcome.styles.scss"

export const Welcome = () => {
  
  const [renderLogo, setRenderLogo] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRenderLogo(true);
    }, 6000);

    setTimeout(() => {
      window.location.href = "/register";
    }, 14000);
  }, []);

  return (
    <section className="welcome">
    <div className="welcome-container">
      <video
        autoPlay="autoplay"
        loop="loop"
        muted
        className="welcome-container__video"
      >
        <source src={Video} type="video/mp4" />
      </video>

      {renderLogo && (
        <>
          <img
            className="welcome-container__logo"
            alt="logo"
            src={PerfectCup}
          />
          <span className="welcome-container__header">Perfect Cup</span>
        </>
      )}
    </div>
  </section>
  );
};
