import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import produce from 'immer';
import Keygen from '../../../helpers/Keygen';
import { createRoutine, createWorkout } from './helpers/Create';
import { getWorkoutList, getRoutineList } from './helpers/Read';
import { updateWorkout, updateRoutine } from './helpers/Update';

export const AdminContext = React.createContext('Admin');

class AdminContextComponent extends Component {
  state = {
    userId: 'DJjKXxB7aVeJPmlZ2EdeBn5KAvr2',
    handleCreateWorkout: workout => this.handleCreateWorkout()(workout),
    handleCreateRoutine: routine => this.handleCreateRoutine()(routine),
    handleUpdateWorkout: (workout, key) =>
      this.handleUpdateWorkout()(workout, key),
    handleUpdateRoutine: (routine, key) =>
      this.handleUpdateRoutine()(routine, key),
    handleChangeWorkoutValue: (val, key, limit) =>
      this.handleChangeWorkoutValue(val, key, limit),
    handleChangeRoutineValue: (val, key, limit) =>
      this.handleChangeRoutineValue(val, key, limit),
    handleDeleteWorkout: key => this.handleDeleteWorkout(key),
    handleDeleteRoutine: key => this.handleDeleteRoutine(key),
    allWorkouts: [],
    allRoutines: []
  };

  componentDidMount() {
    console.log('Mounted');
    const retrieveData = async () => {
      try {
        const workouts = await getWorkoutList(this.state.userId);
        const routines = await getRoutineList(this.state.userId);
        this.setState(
          produce(draft => {
            draft.allWorkouts = workouts;
            draft.allRoutines = routines;
          })
        );
      } catch (err) {
        console.log('Unable to retrieve list data.');
      }
    };
    retrieveData();
  }

  handleCreateWorkout = () => {
    const newWorkoutId = Keygen(this.state.allWorkouts);
    this.setState(
      produce(draft => {
        draft.workout.name = '';
        draft.workout.startingWeight = '';
        draft.workout.weightToAdd = '';
        draft.workout.sets = '';
        draft.workout.reps = '';
      })
    );
    return createWorkout(this.state.userId, newWorkoutId);
  };

  handleCreateRoutine = () => {
    const newRoutineId = Keygen(this.state.allRoutines);
    this.setState(
      produce(draft => {
        draft.routine.name = '';
        draft.routine.sessionLength = '';
        draft.routine.workouts = [];
      })
    );
    return createRoutine(this.state.userId, newRoutineId);
  };

  handleUpdateWorkout = () => {
    return updateWorkout(this.state.userId);
  };

  handleUpdateRoutine = () => {
    return updateRoutine(this.state.userId);
  };

  handleDeleteWorkout = async key => {
    try {
      await firebase
        .database()
        .ref(`/users/${this.state.userId}/workouts/${key}`)
        .remove();
    } catch (err) {
      console.error('Unable to remove workout.');
    }
  };

  handleDeleteRoutine = async key => {
    try {
      await firebase
        .database()
        .ref(`/users/${this.state.userId}/routines/${key}`)
        .remove();
    } catch (err) {
      console.error('Unable to remove routine.');
    }
  };

  render() {
    return (
      <AdminContext.Provider value={this.state}>
        {this.props.children}
      </AdminContext.Provider>
    );
  }
}

AdminContextComponent.propTypes = {};

export default AdminContextComponent;
