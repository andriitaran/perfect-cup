import React from "react";
import { render } from "react-dom";
import _ from "lodash";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class ChangingProgressbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPercentageIndex: 0
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        currentPercentageIndex:
          (this.state.currentPercentageIndex + 1) %
          this.props.percentages.length
      });
    }, this.props.interval);
  }

  getStyles() {
    return this.props.stylesForPercentage
      ? this.props.stylesForPercentage(this.getCurrentPercentage())
      : {};
    ``;
  }

  getCurrentPercentage() {
    return this.props.percentages[this.state.currentPercentageIndex];
  }

  render() {
    return (
      <CircularProgressbar
        {...this.props}
        percentage={this.getCurrentPercentage()}
        styles={this.getStyles()}
      />
    );
  }
}

ChangingProgressbar.defaultProps = {
  interval: 1000
};

export default function CountdownProgressbar(props) {
  const secondsToPercentages = _.range(0, props.numSeconds + 1).map(
    seconds => (seconds / props.numSeconds) * 100
  );

  console.log(secondsToPercentages);

  function percentageToSeconds(percentage) {
    return String(props.numSeconds - (percentage / 100) * props.numSeconds);
  }

  return (
    <ChangingProgressbar
      percentages={secondsToPercentages}
      textForPercentage={percentageToSeconds}
      interval={1000}
    />
  );
}
