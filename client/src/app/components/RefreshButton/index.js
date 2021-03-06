import React, { Component }  from 'react';
import { SvgIcon } from '../';
import './RefreshButton.css';

class RefreshButton extends Component {
  constructor(props) {
    super();
    this.isCancelled = false;
    this.timer=0;
    this.state = {
      time: {},
      seconds: props.timeout,
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
    const { timeout } = this.props;
    let seconds = this.state.seconds - 1;

    if (!this.isCancelled) {
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds
      });

      if ((seconds % 5 === 0)||(seconds > timeout - 5)) {
        localStorage.setItem('seconds', seconds);
      }

      if (seconds === 0) {
        clearInterval(this.timer);
        this.timer = 0;
        this.setState({
          seconds: timeout
        });
        localStorage.removeItem('seconds');
        this.props.reactivation();
      }
    }
  }

  confirmRefresh = () => {
    if (window.confirm("Are you sure you want to refresh the server list?"+
              "\nServer refresh feature will be disabled for 30 minutes.")) 
    {
        this.refreshFunc();
    }
  }

  refreshFunc = () => {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
      localStorage.setItem('seconds', this.props.timeout);
      this.props.serversRefresh();
    }
  }

  componentDidMount() {
    let cookyTime = localStorage.getItem('seconds');
    cookyTime = (cookyTime > 5) ? cookyTime : false;

    if (cookyTime!==false) {
      this.timer = setInterval(this.countDown, 1000);
      this.setState({seconds: localStorage.getItem('seconds')});
    }
    else {
      clearInterval(this.timer);
    }

    let timeLeftVar = this.secondsToTime(
      cookyTime ? cookyTime : this.state.seconds
    );
    this.setState({ time: timeLeftVar });
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  render() {
    const { refreshed } = this.props;
    const { m, s } = this.state.time;

    return (
      <div>
        {
          refreshed ?
          <div className="refreshBtnTime" > { m + ":" + ((s<10) ? "0"+s : s) } </div>
          : <div onClick={this.confirmRefresh}><SvgIcon iconType='refreshBtn' /></div>
        }
      </div>
    );
  }
}

export default RefreshButton;
