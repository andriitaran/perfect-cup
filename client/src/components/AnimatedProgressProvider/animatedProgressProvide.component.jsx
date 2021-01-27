import React, { useState, useEffect } from "react";
import { Animate } from "react-move";

export const AnimatedProgressProvider = (props) => {

  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    let isAnimated = false;
    if (props.repeat) {
      window.setInterval(() => {
        setIsAnimated(
          !isAnimated
        );
      }, props.duration * 1000);
    } else {
      setIsAnimated(
        !isAnimated
      );
    }
  }, [props])

    return (
      <Animate
        start={() => ({
          value: props.valueStart
        })}
        update={() => ({
          value: [
            isAnimated ? props.valueEnd : props.valueStart
          ],
          timing: {
            duration: props.duration * 1000,
            ease: props.easingFunction
          }
        })}
      >
        {({ value }) => props.children(value)}
      </Animate>
    );
}
