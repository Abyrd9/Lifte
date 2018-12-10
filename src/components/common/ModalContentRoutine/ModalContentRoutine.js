import React, { Component } from 'react';
import produce from 'immer';
import PropTypes from 'prop-types';
import { AdminContext } from '../../contexts/AdminContext';
import {
  ModalRoutineWorkoutContainer,
  ModalWorkoutPillsContainer
} from './ModalContentRoutine.styles';
import ModalTitle from '../ModalTitle/ModalTitle';
import ModalInput from '../ModalInput/ModalInput';
import Dropdown from '../Dropdown/Dropdown';
import WorkoutsListener from '../../contexts/WorkoutsListener';
import ModalWorkoutPill from '../ModalWorkoutPill/ModalWorkoutPill';
import ModalButtonList from '../ModalButtonList/ModalButtonList';

class ModalContentRoutine extends Component {
  static contextType = AdminContext;
  state = {
    routine: {
      name: '',
      sessionLength: '',
      currentSession: 0,
      workouts: []
    },
    routineId: ''
  };

  componentDidMount() {
    const { initialRoutine } = this.props;
    if (initialRoutine) {
      this.setState(
        produce(draft => {
          draft.routine.name = initialRoutine.name;
          draft.routine.sessionLength = initialRoutine.sessionLength;
          draft.routine.currentSession = initialRoutine.currentSession;
          draft.routine.workouts = initialRoutine.workouts;
          draft.routineId = initialRoutine.routineId;
        })
      );
    }
  }

  handleChangeValue = (val, key, limit) => {
    if (val.length < limit) {
      this.setState(
        produce(draft => {
          draft.routine[key] = val;
        })
      );
    }
  };

  handleAddWorkout = workout => {
    const routineWorkout = {
      workoutId: workout.workoutId,
      name: workout.name,
      startingWeight: workout.startingWeight,
      weightToAdd: workout.weightToAdd,
      time: {
        minutes: workout.time.minutes,
        seconds: workout.time.seconds
      },
      sessionData: {
        sets: workout.sets,
        reps: workout.reps
      },
      sessions: []
    };
    this.setState(
      produce(draft => {
        draft.routine.workouts.push(routineWorkout);
      })
    );
  };

  handleRemoveWorkout = workoutId => {
    this.setState(
      produce(draft => {
        draft.routine.workouts = draft.routine.workouts.filter(
          workout => workout.workoutId !== workoutId
        );
      })
    );
  };

  handleCreateSessions = () => {
    this.setState(
      produce(draft => {
        draft.routine.workouts = draft.routine.workouts.map(workout => {
          if (!!workout.sessionData) {
            const { sessionLength } = draft.routine;
            const { startingWeight, weightToAdd } = workout;
            const { sets, reps } = workout.sessionData;
            const newSessions = [];
            for (let i = 0; i < parseInt(sessionLength); i++) {
              const weight = startingWeight + weightToAdd * i;
              const completedSets = [];
              for (let i = 0; i < parseInt(sets); i++) {
                completedSets.push({ completed: false });
              }
              newSessions.push({
                completed: false,
                completedSets,
                sets,
                reps,
                weight
              });
            }
            workout.sessions = newSessions;
            workout.sessionData = null;
          }
          return workout;
        });
      })
    );
  };

  render() {
    const { closeModal } = this.props;
    const {
      routine: { name, sessionLength, workouts },
      routineId
    } = this.state;
    return (
      <ModalRoutineWorkoutContainer>
        <ModalTitle
          title={!!routineId && routineId.length > 0 ? 'Edit Routine' : 'Create New Routine'}
        />
        <ModalInput
          title="Name:"
          placeholder="Routine Name..."
          value={name}
          onChange={e => this.handleChangeValue(e.target.value, 'name', 40)}
          type="text"
        />
        <ModalInput
          title="# of Sessions:"
          placeholder="0"
          value={sessionLength}
          onChange={e => this.handleChangeValue(e.target.value, 'sessionLength', 3)}
          type="number"
          isWeight
        />
        <WorkoutsListener>
          {value => (
            <Dropdown placeholder="Add Workouts...">
              {!!value.workouts &&
                value.workouts.map(workout => (
                  <button onClick={() => this.handleAddWorkout(workout)}>{workout.name}</button>
                ))}
            </Dropdown>
          )}
        </WorkoutsListener>
        <ModalWorkoutPillsContainer>
          {!!workouts &&
            workouts.length > 0 &&
            workouts.map(workout => (
              <ModalWorkoutPill
                text={workout.name}
                onClick={() => this.handleRemoveWorkout(workout.workoutId)}
              />
            ))}
        </ModalWorkoutPillsContainer>
        <ModalButtonList
          onCancel={closeModal}
          onSave={() => {
            this.handleCreateSessions();
            if (!!routineId && routineId.length > 0) {
              this.context.handleUpdateRoutine(routineId, this.state.routine);
            } else {
              this.context.handleCreateRoutine(this.state.routine);
            }
            closeModal();
          }}
        />
      </ModalRoutineWorkoutContainer>
    );
  }
}

ModalContentRoutine.propTypes = {
  initialRoutine: PropTypes.oneOfType({
    name: PropTypes.string.isRequired,
    sessionLength: PropTypes.string.isRequired,
    currentSession: PropTypes.number.isRequired,
    workouts: PropTypes.oneOfType([
      {
        workoutId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        startingWeight: PropTypes.string.isRequired,
        weightToAdd: PropTypes.string.isRequired,
        time: PropTypes.oneOfType({
          minutes: PropTypes.string.isRequired,
          seconds: PropTypes.string.isRequired
        }).isRequired,
        sessions: PropTypes.oneOfType([
          {
            completed: PropTypes.bool.isRequired,
            completedSets: PropTypes.bool.isRequired,
            sets: PropTypes.string.isRequired,
            reps: PropTypes.string.isRequired,
            weight: PropTypes.string.isRequired
          }
        ])
      }
    ])
  }),
  closeModal: PropTypes.func.isRequired
};

export default ModalContentRoutine;
