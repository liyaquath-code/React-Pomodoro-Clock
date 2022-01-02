import React from 'react';
import './App.css'
import Control from './Components/Control';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          sessionType: 'Session',
          sessionLength: 25,
          breakLength: 5,
          timer: 1500,
          timerState: 'stopped',
          intervalId: '',
      }
      this.handleLength = this.handleLength.bind(this);
      this.reset = this.reset.bind(this);
      this.timerControl = this.timerControl.bind(this);
  }

  timerControl() {
      this.setState((state) => ({
          timerState: state.timerState === 'stopped' ? 'running' : 'stopped',
      }));
      if (this.state.timerState !== 'running') {
          this.startTimer();
      } else {
          this.stopTimer();
      }
  }

  startTimer() {
      let interval = setInterval(() => {
          if (this.state.timer > 0) {
              this.setState({
                  timer: this.state.timer - 1 > 0 ? this.state.timer - 1 : 0
              })
          } else {
              this.playSound();
              this.stopTimer();
              this.toggleSession();
          }
      }, 1000);
      this.setState({
          intervalId: interval,
      })
  }

  playSound() {
      const sound = document.getElementById('beep');
      sound.volume = 0.5;
      sound.play();
  }

  stopTimer() {
      clearInterval(this.state.intervalId);
  }

  toggleSession() {
      this.setState({
          sessionType: this.state.sessionType === 'Session' ? 'Break' : 'Session',
          timer: this.state.sessionType !== 'Session' ? this.state.sessionLength * 60 : this.state.breakLength * 60
      })
      this.startTimer();
  }

  handleLength(e) {
      let length = e.currentTarget.value + 'Length'
      let sign = e.currentTarget.id.includes('increment');
      if (this.state.timerState === 'running' || (this.state[length] - 1 < 1 && sign === false) || (this.state[length] + 1 > 60 && sign === true)) {
          return;
      }
      this.setState({
          [length]: sign ? this.state[length] + 1 : this.state[length] - 1
      })
      if (this.state.sessionType === 'Session' && length === 'sessionLength') {
          let timer = this.state.sessionLength * 60;
          this.setState({
              timer: sign ? timer + 60 : timer - 60
          })
      }
      if (this.state.sessionType === 'Break' && length === 'breakLength') {
          let timer = this.state.breakLength * 60;
          this.setState({
              timer: sign ? timer + 60 : timer - 60
          })
      }
  }

  reset() {
      this.stopTimer();
      const sound = document.getElementById('beep');
      sound.pause();
      sound.currentTime = 0;
      this.setState({
          sessionType: 'Session',
          sessionLength: 25,
          breakLength: 5,
          timer: 1500,
          timerState: 'stopped',
          intervalId: '',
      })
  }

  render() {
      return (
          <div className='rootContainer'>
              <div className='timer' style={this.state.timer<=10 ? {borderColor: '#EF514F'} : {borderColor: '#08E08A'}}>
                  <span id="time-left" style={this.state.timer<=10 ? {animation: 'blinker 1s step-start infinite'} : {animtation: 'none'}}>{formatTime(this.state.timer)}</span>
                  <span id="timer-label">{this.state.sessionType}</span>
              </div>

              <div id="start_stop" onClick={this.timerControl} title={this.state.timerState === 'stopped' ? 'Start the Clock' : 'Pause the Clock'}>
                  {this.state.timerState === 'stopped' ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>}
              </div>

              <div className='control'>
                  <Control sessionType='session'
                      length={this.state.sessionLength}
                      onClick={this.handleLength} />
                  <Control sessionType='break'
                      length={this.state.breakLength}
                      onClick={this.handleLength} />
              </div>

              <div>
                  <button
                      id="reset"
                      onClick={this.reset}>
                      <i className="fas fa-redo-alt" title='Reset'></i>
                  </button>
                  <button
                      onClick={this.playSound}>
                      <i className="fas fa-volume-up"></i>{/*<i className="fas fa-volume-mute"></i>*/}
                  </button>
              </div>
              <audio
                  id='beep'
                  preload='auto'
                  src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
          </div>
      )
  }
}

function formatTime(time) {
  let mm = Math.floor(time / 60);
  let ss = Math.floor(time % 60);
  mm = mm >= 10 ? mm : `0${mm}`
  ss = ss >= 10 ? ss : `0${ss}`
  return `${mm}:${ss}`
}

export default App;