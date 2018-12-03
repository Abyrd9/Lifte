import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import produce from 'immer';
import Keygen from '../../../helpers/Keygen';
import { createRoutine, createWorkout } from './helpers/Create';
import {
  getWorkoutList,
  getRoutineList,
  getWorkoutListListener,
  getRoutineListListener,
  removeWorkoutListListener,
  removeRoutineListListener
} from './helpers/Read';
import {
  updateWorkout,
  updateRoutine,
  updateRoutineValue,
  updateRoutineWorkoutValue
} from './helpers/Update';
import { deleteWorkout, deleteRoutine } from './helpers/Delete';

export const AdminContext = React.createContext('Admin');

class AdminContextComponent extends Component {
  state = {
    handleGetWorkouts: () => this.handleGetWorkoutList(),
    handleGetRoutines: () => this.handleGetRoutineList(),
    handleSetGetWorkoutsListener: () => this.handleSetGetWorkoutsListener(),
    handleSetGetRoutinesListener: () => this.handleSetGetRoutinesListener(),
    handleRemoveGetWorkoutsListener: () =>
      this.handleRemoveGetWorkoutsListener(),
    handleRemoveGetRoutinesListener: () =>
      this.handleRemoveGetRoutinesListener(),
    handleCreateWorkout: workout => this.handleCreateWorkout()(workout),
    handleCreateRoutine: routine => this.handleCreateRoutine()(routine),
    handleUpdateWorkout: (workout, key) =>
      this.handleUpdateWorkout()(workout, key),
    handleUpdateRoutine: (routine, key) =>
      this.handleUpdateRoutine()(routine, key),
    handleUpdateRoutineValue: (routineId, key, value) =>
      this.handleUpdateRoutineValue()(routineId, key, value),
    handleUpdateRoutineWorkoutValue: (routineId, workoutId, key, value) =>
      this.handleUpdateRoutineWorkoutValue()(routineId, workoutId, key, value),
    handleDeleteWorkout: key => this.handleDeleteWorkout()(key),
    handleDeleteRoutine: key => this.handleDeleteRoutine()(key)
  };

  getUserId = () => {
    if (!!firebase.auth().currentUser) {
      return firebase.auth().currentUser.uid;
    } else {
      return '';
    }
  };

  handleGetWorkouts = async () => {
    const userId = this.getUserId();
    try {
      const workouts = await getWorkoutList(userId);
      return workouts;
    } catch (err) {
      console.log('Unable to retrieve workouts.');
    }
  };

  handleGetRoutines = async () => {
    const userId = this.getUserId();
    try {
      const routines = await getRoutineList(userId);
      return routines;
    } catch (err) {
      console.log('Unable to retrieve workouts.');
    }
  };

  handleSetGetWorkoutsListener = () => {
    const userId = this.getUserId();
    getWorkoutListListener(userId);
  };

  handleSetGetRoutinesListener = () => {
    const userId = this.getUserId();
    getRoutineListListener(userId);
  };

  handleRemoveGetWorkoutsListener = () => {
    const userId = this.getUserId();
    removeWorkoutListListener(userId);
  };

  handleRemoveGetRoutinesListener = () => {
    const userId = this.getUserId();
    removeRoutineListListener(userId);
  };

  handleCreateWorkout = () => {
    const userId = this.getUserId();
    const workouts = this.handleGetWorkouts();
    const newWorkoutId = Keygen(workouts);
    return createWorkout(userId, newWorkoutId);
  };

  handleCreateRoutine = () => {
    const userId = this.getUserId();
    const routines = this.handleGetRoutines();
    const newRoutineId = Keygen(routines);
    return createRoutine(userId, newRoutineId);
  };

  handleUpdateWorkout = () => {
    const userId = this.getUserId();
    return updateWorkout(userId);
  };

  handleUpdateRoutine = () => {
    const userId = this.getUserId();
    return updateRoutine(userId);
  };

  handleUpdateRoutineValue = () => {
    const userId = this.getUserId();
    return updateRoutineValue(userId);
  };

  handleUpdateRoutineWorkoutValue = () => {
    const userId = this.getUserId();
    return updateRoutineWorkoutValue(userId);
  };

  handleDeleteWorkout = () => {
    const userId = this.getUserId();
    return deleteWorkout(userId);
  };

  handleDeleteRoutine = () => {
    const userId = this.getUserId();
    return deleteRoutine(userId);
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
