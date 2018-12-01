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
import { updateWorkout, updateRoutine } from './helpers/Update';
import { deleteWorkout, deleteRoutine } from './helpers/Delete';

export const AdminContext = React.createContext('Admin');

class AdminContextComponent extends Component {
  state = {
    userId: '',
    handleGetWorkouts: () => this.handleGetWorkoutList(),
    handleGetRoutines: () => this.handleGetRoutineList(),
    handleSetGetWorkoutsListener: () => this.handleSetGetWorkoutsListener(),
    handleSetGetRoutinesListener: () => this.handleSetGetRoutinesListener(),
    handleRemoveGetWorkoutsListener: () => this.handleRemoveGetWorkoutsListener(),
    handleRemoveGetRoutinesListener: () => this.handleRemoveGetRoutinesListener(),
    handleCreateWorkout: workout => this.handleCreateWorkout()(workout),
    handleCreateRoutine: routine => this.handleCreateRoutine()(routine),
    handleUpdateWorkout: (workout, key) => this.handleUpdateWorkout()(workout, key),
    handleUpdateRoutine: (routine, key) => this.handleUpdateRoutine()(routine, key),
    handleDeleteWorkout: key => this.handleDeleteWorkout()(key),
    handleDeleteRoutine: key => this.handleDeleteRoutine()(key),
    allWorkouts: [],
    allRoutines: []
  };

  componentDidMount() {
    const currentUser = firebase.auth().currentUser;
    if (!!currentUser) this.setState({ userId: currentUser.uid });

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

  handleGetWorkouts = async () => {
    try {
      const workouts = await getWorkoutList(this.state.userId);
      return workouts;
    } catch (err) {
      console.log('Unable to retrieve workouts.');
    }
  };

  handleGetRoutines = async () => {
    try {
      const routines = await getRoutineList(this.state.userId);
      return routines;
    } catch (err) {
      console.log('Unable to retrieve workouts.');
    }
  };

  handleSetGetWorkoutsListener = () => {
    getWorkoutListListener(this.state.userId);
  };

  handleSetGetRoutinesListener = () => {
    getRoutineListListener(this.state.userId);
  };

  handleRemoveGetWorkoutsListener = () => {
    removeWorkoutListListener(this.state.userId);
  };

  handleRemoveGetRoutinesListener = () => {
    removeRoutineListListener(this.state.userId);
  };

  handleCreateWorkout = () => {
    const newWorkoutId = Keygen(this.state.allWorkouts);
    return createWorkout(this.state.userId, newWorkoutId);
  };

  handleCreateRoutine = () => {
    const newRoutineId = Keygen(this.state.allRoutines);
    return createRoutine(this.state.userId, newRoutineId);
  };

  handleUpdateWorkout = () => {
    return updateWorkout(this.state.userId);
  };

  handleUpdateRoutine = () => {
    return updateRoutine(this.state.userId);
  };

  handleDeleteWorkout = () => {
    return deleteWorkout(this.state.userId);
  };

  handleDeleteRoutine = () => {
    return deleteRoutine(this.state.userId);
  };

  render() {
    return <AdminContext.Provider value={this.state}>{this.props.children}</AdminContext.Provider>;
  }
}

AdminContextComponent.propTypes = {};

export default AdminContextComponent;
