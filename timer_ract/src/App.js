import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timeLeft: null, interval: null, userInput: "" };
  }

  inputTime = () => {
    if (new RegExp(/^\d+$/).test(this.state.userInput)) {
      this.setState({ timeLeft: this.state.userInput });
    } 
  };

  startTimer = () => {
    const { timeLeft } = this.state;

    if (timeLeft === null) {
      return;
    }
    
    const interval = setInterval(() => {
      if (this.state.timeLeft > 0) {
        this.setState({ timeLeft: this.state.timeLeft - 1000 });
      } else {
        this.stopTimer();
      }
    }, 1000);

    this.setState({ interval });
  };

  stopTimer = () => {
    clearInterval(this.state.interval);
  };

  clearTimer = () => {
    this.setState({  timeLeft: null, interval: null, userInput: ""  });
  };

  setUserInput = (evt) => {
    this.setState({ userInput: evt.target.value });
  };

  formatTime = (ms) => {
    let seconds = parseInt((ms / 1000) % 60),
      minutes = parseInt((ms / (1000 * 60)) % 60),
      hours = parseInt((ms / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  render() {
    const { userInput, timeLeft } = this.state;
    return (
      <div>
        <div className="App">
          <input
            placeholder="Set time ms"
            value={userInput}
            onChange={this.setUserInput}
          />
          <button className= {this.state.userInput ? "setTime_btn" : "button-disabled"} onClick={this.inputTime}>
            Set Time
          </button>
          <div className="time_counter">
            {timeLeft ? this.formatTime(timeLeft) : "Time left"}
          </div>
          <button className= {this.state.timeLeft ? "setTime_btn" : "button-disabled"} onClick={this.startTimer}>
            Play
          </button>
          <button className= {this.state.timeLeft ? "setTime_btn" : "button-disabled"} onClick={this.stopTimer}>
            Pause
          </button>
          <button className= {this.state.timeLeft ? "setTime_btn" : "button-disabled"} onClick={this.clearTimer}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default App;
