import React, { Component } from 'react';

class Stopwatch extends Component {

  state = {
    isRunning: false,
    elapsedTime: 0,
    previousTime: 0
  };

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.tick();
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick = () => {
    //console.log('ticking...');
    if (this.state.isRunning) {
      const now = Date.now();
      this.setState( prevState => ({
        previousTime: now,
        elapsedTime: prevState.elapsedTime + (now - this.state.previousTime)
      }));
    }
  };

  handleStopwatch = () => {
    this.setState( prevState => ({
      isRunning: !prevState.isRunning
    }));

    if(!this.state.isRunning) {
      console.log('Starting...')
      this.setState({ previousTime: Date.now() });
    } else {
      console.log('Stopping...');
    }
  };

  handleReset = () => {
    console.log('Resetting...');
    this.setState({
      isRunning: false,
      elapsedTime: 0,
      previousTime: 0
    });
  };

  render() {

    const seconds = Math.floor(this.state.elapsedTime / 1000);

    const startOrStop = this.state.isRunning ? 'Stop' : 'Start';

    return(
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <span className="stopwatch-time">{seconds}</span>
        <button onClick={this.handleStopwatch}>{startOrStop}</button>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}

export default Stopwatch;