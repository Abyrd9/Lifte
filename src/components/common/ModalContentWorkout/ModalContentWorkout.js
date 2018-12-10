import React, { Component } from 'react';
import produce from 'immer';
import PropTypes from 'prop-types';
import { AdminContext } from '../../contexts/AdminContext';
import {
  ModalContentWorkoutContainer,
  ModalContentInputBlock,
  ModalContentDivider
} from './ModalContentWorkout.styles';
import ModalTitle from '../ModalTitle/ModalTitle';
import ModalInput from '../ModalInput/ModalInput';
import ModalDoubleInput from '../ModalDoubleInput/ModalDoubleInput';
import ModalButtonList from '../ModalButtonList/ModalButtonList';

class ModalContentWorkout extends Component {
  static contextType = AdminContext;
  state = {
    workout: {
      name: '',
      startingWeight: '',
      weightToAdd: '',
      sets: '',
      reps: '',
      time: {
        minutes: '',
        seconds: ''
      }
    },
    workoutId: ''
  };

  componentDidMount() {
    const { initialWorkout } = this.props;
    if (initialWorkout) {
      this.setState(
        produce(draft => {
          draft.workout.name = initialWorkout.name;
          draft.workout.startingWeight = initialWorkout.startingWeight;
          draft.workout.weightToAdd = initialWorkout.weightToAdd;
          draft.workout.sets = initialWorkout.sets;
          draft.workout.reps = initialWorkout.reps;
          draft.workout.time.minutes = initialWorkout.time.minutes;
          draft.workout.time.seconds = initialWorkout.time.seconds;
          draft.workoutId = initialWorkout.workoutId;
        })
      );
    }
  }

  handleChangeValue = (val, key, limit) => {
    if (val.length < limit) {
      this.setState(
        produce(draft => {
          draft.workout[key] = val;
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
            draft.workout.time[key] = '';
          })
        );
      } else {
        this.setState(
          produce(draft => {
            draft.workout.time[key] = newValue;
          })
        );
      }
    }
  };

  render() {
    const { closeModal } = this.props;
    const {
      workout: {
        name,
        startingWeight,
        weightToAdd,
        sets,
        reps,
        time: { minutes, seconds }
      },
      workoutId
    } = this.state;
    return (
      <ModalContentWorkoutContainer>
        <ModalTitle
          title={!!workoutId && workoutId.length > 0 ? 'Edit Workout' : 'Create New Workout'}
        />
        <ModalInput
          title="Name:"
          placeholder="Workout Name..."
          value={name}
          onChange={e => this.handleChangeValue(e.target.value, 'name', 40)}
          type="text"
        />
        <ModalContentInputBlock>
          <ModalInput
            title="Starting Weight:"
            placeholder="0"
            value={startingWeight}
            onChange={e => this.handleChangeValue(e.target.value, 'startingWeight', 3)}
            affixedText="lbs"
            type="number"
            isWeight
          />
          <ModalContentDivider />
          <ModalInput
            title="Weight To Add:"
            placeholder="0"
            value={weightToAdd}
            onChange={e => this.handleChangeValue(e.target.value, 'weightToAdd', 3)}
            affixedText="lbs"
            isWeight
          />
        </ModalContentInputBlock>
        <ModalContentInputBlock>
          <ModalDoubleInput
            title="Sets & Reps:"
            placeholder="0"
            divider="x"
            type="number"
            firstValue={sets}
            secondValue={reps}
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
              this.context.handleUpdateWorkout(workoutId, this.state.workout);
            } else {
              this.context.handleCreateWorkout(this.state.workout);
            }
            closeModal();
          }}
        />
      </ModalContentWorkoutContainer>
    );
  }
}

ModalContentWorkout.propTypes = {
  initialWorkout: PropTypes.oneOfType({
    name: PropTypes.string.isRequired,
    startingWeight: PropTypes.string.isRequired,
    weightToAdd: PropTypes.string.isRequired,
    sets: PropTypes.string.isRequired,
    reps: PropTypes.string.isRequired,
    time: PropTypes.oneOfType({
      minutes: PropTypes.string.isRequired,
      seconds: PropTypes.string.isRequired
    }).isRequired
  }),
  closeModal: PropTypes.func.isRequired
};

export default ModalContentWorkout;
