import React, { Component } from 'react';
import produce from 'immer';
import PropTypes from 'prop-types';
import * as api from '../../../helpers/api';
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
    const hasWorkout = this.state.routine.workouts.some(
      currentWorkout => currentWorkout.workoutId === workout.workoutId
    );
    if (!hasWorkout) {
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
    }
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

  handleSaveRoutine = () => {
    const { routine, routineId } = this.state;

    // Make copy of routine from state so we can directly change the workouts
    // create a new session array that we generate new session with
    const routineCopy = JSON.parse(JSON.stringify(routine));
    let newSessions = [];

    // This new session generation function is run at different times as we map over
    // the workouts in the routine
    const generateNewSession = (startingWeight, weightToAdd, sets, reps, index) => {
      // Every session keeps track of the sets being completed
      // create the array of those sets here
      const completedSetsArr = [];
      for (let i = 0; i < parseInt(sets); i++) {
        completedSetsArr.push({ completed: false });
      }
      // For every iteration, add the weight to be added times the number
      // so if starting weight is 90, and weight to add is 5,
      // and we're on the third session, 90 + (5 * 3) = 105 and so on...
      const weight = parseInt(startingWeight) + parseInt(weightToAdd) * index;
      // return the newly generated session
      return {
        completed: false,
        completedSetsArr,
        sets,
        reps,
        weight
      };
    };

    // map over the workouts to create a new workouts array with
    // the correct sessions
    const workouts = routineCopy.workouts.map(workout => {
      const { sessionLength } = routineCopy;
      const { startingWeight, weightToAdd, sessions } = workout;

      // If the sesions length is greater than 0, it already has sessions
      // and needs to be treated differently
      if (!!sessions && sessions.length > 0) {
        // start looping over the sessionLength,
        // we don't know if the length is less or more than the previous
        for (let i = 0; i < parseInt(sessionLength); i++) {
          // if the session currently exists, simply push it into the array
          // Routines only add or remove workouts, so no workout data should have changed
          if (!!sessions[i]) {
            newSessions.push(sessions[i]);
          } else {
            // if the session length is higher than the previous, we need to generate new sessions
            // get sets and reps from the first session item, they should all be the same
            const { sets, reps } = sessions[0];
            const generatedSession = generateNewSession(startingWeight, weightToAdd, sets, reps, i);
            newSessions.push(generatedSession);
          }
        }

        // make the workout session to the new sessions
        // clear the newSessions back to an empty array for future workouts
        workout.sessions = newSessions;
        newSessions = [];
        return workout;
      } else {
        // here below we are generating all new sessions
        // get the sets and reps from the sessionData
        const { sets, reps } = workout.sessionData;
        // loop over the session length and generate new sessions
        for (let i = 0; i < parseInt(sessionLength); i++) {
          const generatedSession = generateNewSession(startingWeight, weightToAdd, sets, reps, i);
          newSessions.push(generatedSession);
        }
        // Delete the sessionData, we don't want it in the database,
        // it's only there to build new sesssions
        workout.sessionData = null;

        // make the workout session to the new sessions
        // clear the newSessions back to an empty array for future workouts
        workout.sessions = newSessions;
        newSessions = [];
        return workout;
      }
    });
    routineCopy.workouts = workouts;

    // if there's a routineId, it means we're editing a routine
    // if not, we're generating a new routine
    if (routineId.length > 0) {
      api.handleUpdateRoutine(routineId, routineCopy);
    } else {
      api.handleCreateRoutine(routineCopy);
    }
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
          maxTwo
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
            this.handleSaveRoutine();
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
            completedSets: PropTypes.oneOfType([{ completed: PropTypes.bool.isRequired }])
              .isRequired,
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
