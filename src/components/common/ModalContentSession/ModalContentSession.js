import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import * as api from '../../../helpers/api';
import {
  ModalContentSessionContainer,
  ModalContentInputBlock,
  ModalContentDivider
} from './ModalContentSession.styles';
import ModalTitle from '../ModalTitle/ModalTitle';
import ModalInput from '../ModalInput/ModalInput';
import ModalDoubleInput from '../ModalDoubleInput/ModalDoubleInput';
import ModalButtonList from '../ModalButtonList/ModalButtonList';

class ModalContentSession extends Component {
  state = {
    workoutId: '',
    time: {
      minutes: '',
      seconds: ''
    },
    sessions: []
  };

  componentDidMount() {
    const { workout } = this.props;
    if (!!workout) {
      const {
        workoutId,
        time: { minutes, seconds },
        sessions
      } = workout;
      this.setState(
        produce(draft => {
          draft.workoutId = workoutId;
          draft.time.minutes = minutes ? minutes : '00';
          draft.time.seconds = seconds ? seconds : '00';
          draft.sessions = sessions;
        })
      );
    }
  }

  handleChangeValue = (val, key, limit) => {
    const { currentSessionIndex } = this.props;
    if (val.length < limit) {
      this.setState(
        produce(draft => {
          draft.sessions[currentSessionIndex][key] = val;
        })
      );
    }
  };

  handleSetTimeValue = (val, key, limit) => {
    if (val.length < limit) {
      let newValue = val;

      // if there's only one number and it's not 0,
      // add a 0 to the beginning to make it a time.
      if (val.length === 1 && val !== '0') {
        newValue = `0${val}`;
      }

      // if the length is 3, then remove the front 0
      if (val.length === 3) {
        newValue = newValue.substring(1);
      }

      // If the newValue is still 00, wipe it from state,
      // If not, set the newValue
      if (newValue === '00') {
        this.setState(
          produce(draft => {
            draft.time[key] = '';
          })
        );
      } else {
        this.setState(
          produce(draft => {
            draft.time[key] = newValue;
          })
        );
      }
    }
  };

  handleSaveWorkoutSession = () => {
    const { routineId, workout } = this.props;
    const { time, sessions, workoutId } = this.state;
    const newWorkout = JSON.parse(JSON.stringify(workout));
    newWorkout.time = time;
    newWorkout.sessions = sessions;
    api.handleUpdateSessionInWorkout(routineId, workoutId, newWorkout);
  };

  render() {
    const {
      workoutId,
      time: { minutes, seconds },
      sessions
    } = this.state;
    const { closeModal, currentSessionIndex } = this.props;
    return (
      <ModalContentSessionContainer>
        {!!workoutId && workoutId.length > 0 && (
          <Fragment>
            <ModalTitle title="Edit Current Session" />
            <ModalContentInputBlock>
              <ModalInput
                title="Weight:"
                placeholder="0"
                type="number"
                value={sessions[currentSessionIndex].weight}
                onChange={e => this.handleChangeValue(e.target.value, 'weight', 40)}
                isWeight
                maxThree
              />
              <ModalContentDivider />
              <ModalDoubleInput
                title="Sets & Reps:"
                placeholder="0"
                divider="x"
                type="number"
                firstValue={sessions[currentSessionIndex].sets}
                secondValue={sessions[currentSessionIndex].reps}
                onChangeFirstValue={e => this.handleChangeValue(e.target.value, 'sets', 3)}
                onChangeSecondValue={e => this.handleChangeValue(e.target.value, 'reps', 3)}
              />
              <ModalContentDivider />
              <ModalDoubleInput
                title="Rest Time:"
                placeholder="00"
                divider=":"
                type="number"
                firstValue={minutes}
                secondValue={seconds}
                onChangeFirstValue={e => this.handleSetTimeValue(e.target.value, 'minutes', 4)}
                onChangeSecondValue={e => this.handleSetTimeValue(e.target.value, 'seconds', 4)}
                affixedText="m/s"
              />
            </ModalContentInputBlock>
            <ModalButtonList
              onCancel={closeModal}
              onSave={() => {
                if (!!workoutId && workoutId.length > 0) {
                  this.handleSaveWorkoutSession();
                  closeModal();
                }
              }}
            />
          </Fragment>
        )}
      </ModalContentSessionContainer>
    );
  }
}

ModalContentSession.propTypes = {
  workout: PropTypes.oneOfType({
    workoutId: PropTypes.string.isRequired,
    time: PropTypes.oneOfType({
      minutes: PropTypes.string.isRequired,
      seconds: PropTypes.string.isRequired
    }).isRequired,
    sessions: PropTypes.oneOfType([
      {
        weight: PropTypes.string.isRequired,
        sets: PropTypes.string.isRequired,
        reps: PropTypes.string.isRequired
      }
    ]).isRequired
  }).isRequired,
  currentSessionIndex: PropTypes.number.isRequired
};

export default ModalContentSession;
