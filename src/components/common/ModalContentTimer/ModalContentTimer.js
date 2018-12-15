import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import {
  TimerSection,
  TimerButton,
  TimerIcon,
  CancelTimerIcon,
  TimerButtonContainer
} from './ModalContentTimer.styles';

class ModalContentTimer extends Component {
  state = {
    startingTime: {
      minutes: '00',
      seconds: '00'
    },
    countdown: {
      minutes: '00',
      seconds: '00'
    },
    countdownRunning: false,
    countdownComplete: false
  };

  componentDidMount() {
    const { minutes, seconds } = this.props;
    this.setState(
      produce(draft => {
        draft.startingTime.minutes = minutes ? minutes : '00';
        draft.startingTime.seconds = seconds ? seconds : '00';
        draft.countdown.minutes = minutes ? minutes : '00';
        draft.countdown.seconds = seconds ? seconds : '00';
      })
    );
  }

  componentDidUpdate(prevProps) {
    if (
      !!prevProps &&
      prevProps.minutes !== this.props.minutes &&
      prevProps.seconds !== this.props.seconds
    ) {
      const { minutes, seconds } = this.props;
      this.setState(
        produce(draft => {
          draft.startingTime.minutes = minutes ? minutes : '00';
          draft.startingTime.seconds = seconds ? seconds : '00';
          draft.countdown.minutes = minutes ? minutes : '00';
          draft.countdown.seconds = seconds ? seconds : '00';
        })
      );
    }
  }

  startCountdown = () => {
    const { minutes, seconds } = this.state.startingTime;

    // Convert minutes and seconds into milliseconds and add together
    let min = parseInt(minutes) * 60 * 1000;
    let sec = parseInt(seconds) * 1000;
    const startTime = min + sec;
    const minute = 60000;

    // Get the milliseconds from browser's Date
    // This is milliseconds since 1995 or something.
    const currentTime = Date.now();

    // The start time added to the current time in milliseconds
    // will give us the time the timer should stop.
    const expectedEndTime = currentTime + startTime;

    // 1000 = 1s, Every 250ms, the Interval will check if the current Date
    // time is greater than or equal to the intervalTime, and add 1s if it is.
    // It will also set the timer in state down by 1s. if the current Date time
    // every becomes greater than or equal to the expectedEndTime, the button
    // will be re-enabled and the interval will be cleared.
    //
    // This is a more accurate way to do countdown rather than using
    // the browser's setTimout or setInterval as both are not accurate.
    let intervalTime = currentTime + 1000;
    const Interval = setInterval(() => {
      // If countdownRunning has somehow been set to false, stop the countdown
      const { countdownRunning } = this.state;
      if (!countdownRunning) {
        this.setState(
          produce(draft => {
            draft.countdown = this.state.startingTime;
            draft.countdownComplete = true;
            draft.countdownRunning = false;
          })
        );
        clearInterval(Interval);
      }

      if (Date.now() >= intervalTime) {
        // Add 1 second to the interval time
        intervalTime = intervalTime + 1000;

        // Get countdown minutes and seconds from state,
        // then turn them into integers
        const { minutes, seconds } = this.state.countdown;
        let min = parseInt(minutes);
        let sec = parseInt(seconds);
        console.log(min, sec);
        if (sec > 0) {
          // if seconds doesn't equal 0, subtract one
          sec = sec - 1;
          this.setState(
            produce(draft => {
              draft.countdown.seconds = sec.toString().padStart(2, '0');
            })
          );
        } else if (sec <= 0 && min > 0) {
          // if seconds does equal 0, and minutes is greater than 0,
          // subtract one from minutes, and reset seconds to 60
          min = min - 1;
          this.setState(
            produce(draft => {
              draft.countdown.minutes = min.toString().padStart(2, '0');
              draft.countdown.seconds = '60';
            })
          );
        } else if (sec === 0 && min === 0) {
          // if both minutes and seconds are 0, clear the interval
          this.setState(
            produce(draft => {
              draft.countdown = this.state.startingTime;
              draft.countdownComplete = true;
              draft.countdownRunning = false;
            })
          );
          clearInterval(Interval);
        }
      }
    }, 100);
  };

  render() {
    const { countdownRunning } = this.state;
    const { minutes, seconds } = this.state.countdown;
    return (
      <Fragment>
        <TimerSection>
          <h1>
            <TimerIcon icon="stopwatch" />
            {!!minutes ? minutes : '00'}:{!!seconds ? seconds : '00'}
          </h1>
          <p>min/sec</p>
        </TimerSection>
        <TimerButtonContainer>
          <TimerButton
            onClick={e => {
              e.stopPropagation();
              this.setState({ countdownRunning: true });
              this.startCountdown();
            }}
            disabled={countdownRunning}>
            Start Timer
          </TimerButton>
          {countdownRunning && (
            <CancelTimerIcon
              icon="times-circle"
              onClick={e => {
                e.stopPropagation();
                this.setState({ countdownRunning: false });
              }}
            />
          )}
        </TimerButtonContainer>
      </Fragment>
    );
  }
}

ModalContentTimer.propTypes = {
  minutes: PropTypes.minutes,
  seconds: PropTypes.seconds
};

export default ModalContentTimer;
