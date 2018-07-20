import React, { Component }  from 'react';
import './RefreshButton.css';

class RefreshButton extends Component {
  constructor() {
    super();
    this.timer=0;
    this.state = {
      time: {},
      seconds: 300
    }
  }

  secondsToTime(secs){
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  countDown = () => {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (seconds === 0) {
      clearInterval(this.timer);
      this.timer = 0;
      this.setState({
        seconds: 300
      });
    }
  }

  refreshFunc = () => {
    if (this.timer === 0) {
      this.props.serversRefresh();
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  render() {
    const { refreshed } = this.props;

    return (
      <button
        type="button"
        onClick={this.refreshFunc}
        id="nb-refresh"
        style={refreshed ? { fontSize: 16 } : {}}
        disabled={refreshed ? true : false}
      >
        {
          refreshed
          ? this.state.time.m+"min "+this.state.time.s+"s"
          : "Refresh Servers "
        }
      </button>
    );
  }
}

export default RefreshButton;
