import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import Keygen from '../../helpers/Keygen';

export const AdminContext = React.createContext('Admin');

class AdminContextComponent extends Component {
  state = {
    handleGetWorkouts: () => this.handleGetWorkouts(),
    handleGetRoutines: () => this.handleGetRoutines(),
    handleCreateWorkout: workout => this.handleCreateWorkout(workout),
    handleCreateRoutine: routine => this.handleCreateRoutine(routine),
    handleUpdateWorkout: (workoutId, workout) => this.handleUpdateWorkout(workoutId, workout),
    handleUpdateRoutine: (routineId, routine) => this.handleUpdateRoutine(routineId, routine),
    handleDeleteWorkout: workoutId => this.handleDeleteWorkout(workoutId),
    handleDeleteRoutine: routineId => this.handleDeleteRoutine(routineId)
  };

  handleGetWorkouts = async () => {
    const auth = firebase.auth();
    if (!!auth.currentUser) {
      const userId = auth.currentUser.uid;
      try {
        const workouts = await firebase
          .database()
          .ref(`/users/${userId}/workouts/`)
          .once('value', snapshot => {
            let workoutList = snapshot.val();
            workoutList ? (workoutList = Object.values(workoutList)) : (workoutList = []);
            return workoutList;
          });
        return workouts;
      } catch (err) {
        console.warn('Unable to get workouts.');
        console.warn(err.code, err.message);
      }
    }
  };

  handleGetRoutines = async () => {
    const auth = firebase.auth();
    if (!!auth.currentUser) {
      const userId = auth.currentUser.uid;
      try {
        const routines = await firebase
          .database()
          .ref(`/users/${userId}/routines/`)
          .once('value', snapshot => {
            let routineList = snapshot.val();
            routineList ? (routineList = Object.values(routineList)) : (routineList = []);
            return routineList;
          });
        return routines;
      } catch (err) {
        console.warn('Unable to get routines.');
        console.warn(err.code, err.message);
      }
    }
  };

  handleCreateWorkout = async workout => {
    const auth = firebase.auth();
    if (!!auth.currentUser) {
      const userId = auth.currentUser.uid;
      try {
        const workouts = await this.handleGetWorkouts();
        const workoutId = Keygen(workouts);
        await firebase
          .database()
          .ref(`/users/${userId}/workouts/${workoutId}/`)
          .update({ ...workout, workoutId });
      } catch (err) {
        console.warn('Unable to create workout.');
        console.warn(err.code, err.message);
      }
    }
  };

  handleCreateRoutine = async routine => {
    const auth = firebase.auth();
    if (!!auth.currentUser) {
      const userId = auth.currentUser.uid;
      try {
        const routines = await this.handleGetRoutines();
        const routineId = Keygen(routines);
        await firebase
          .database()
          .ref(`/users/${userId}/routines/${routineId}/`)
          .update({ ...routine, routineId });
      } catch (err) {
        console.warn('Unable to create routine.');
        console.warn(err.code, err.message);
      }
    }
  };

  handleUpdateWorkout = async (workoutId, workout) => {
    const auth = firebase.auth();
    if (!!auth.currentUser) {
      const userId = auth.currentUser.uid;
      try {
        await firebase
          .database()
          .ref(`/users/${userId}/workouts/${workoutId}`)
          .update({ workout });
      } catch (err) {
        console.warn('Unable to update workout.');
        console.warn(err.code, err.message);
      }
    }
  };

  handleUpdateRoutine = async (routineId, routine) => {
    const auth = firebase.auth();
    if (!!auth.currentUser) {
      const userId = auth.currentUser.uid;
      try {
        await firebase
          .database()
          .ref(`/users/${userId}/routines/${routineId}`)
          .update({ routine });
      } catch (err) {
        console.warn('Unable to update routine.');
        console.warn(err.code, err.message);
      }
    }
  };

  handleUpdateWorkoutInRoutines = async (userId, workoutId, workout) => {
    try {
      // Get list of all routines as an array
      let routines = await firebase
        .database()
        .ref(`/users/${userId}/routines/`)
        .once('value', snapshot => {
          let routineList = snapshot.val();
          routineList ? (routineList = Object.values(routineList)) : (routineList = []);
          return routineList;
        });

      // create new routines list, mapping over each routine
      routines = routines.map(routine => {
        // Get the workout that will be replaced with the workout passed in
        let workoutToUpdate = routine.workouts.find(workout => workout.workoutId === workoutId);

        // Replace all workout values with the values from the workout passed in
        // firebase will only update those values that have changed
        if (!!workoutToUpdate) {
          workoutToUpdate.name = workout.name;
          workoutToUpdate.weightToAdd = workout.weightToAdd;
          workoutToUpdate.startingWeight = workout.startingWeight;
          workoutToUpdate.time = workout.time;
          workoutToUpdate.session.forEach((session, i) => {
            if (!session.completed) {
              const addWeight = workout.weightToAdd * i;
              workoutToUpdate.weight = workout.startingWeight + addWeight;
              workoutToUpdate.sets = workout.sets;
              workoutToUpdate.reps = workout.reps;
            }
          });
        }
        return routine;
      });

      // Update all routines in firebase
      await firebase
        .database()
        .ref(`/users/${userId}/`)
        .update({ routines });
    } catch (err) {
      console.log('Unable to update workouts within routines.');
    }
  };

  handleDeleteWorkout = async workoutId => {
    const auth = firebase.auth();
    if (!!auth.currentUser) {
      const userId = auth.currentUser.uid;
      try {
        await firebase.database().ref(`/users/${userId}/workouts/${workoutId}`);
        await this.handleDeleteWorkoutsInRoutine(workoutId, userId);
      } catch (err) {
        console.warn('Unable to remove workout.');
        console.warn(err.code, err.message);
      }
    }
  };

  handleDeleteRoutine = async routineId => {
    const auth = firebase.auth();
    if (!!auth.currentUser) {
      const userId = auth.currentUser.uid;
      try {
        await firebase
          .database()
          .ref(`/users/${userId}/routines/${routineId}`)
          .remove();
      } catch (err) {
        console.warn('Unable to remove routine.');
        console.warn(err.code, err.message);
      }
    }
  };

  handleDeleteWorkoutsInRoutine = async (workoutId, userId) => {
    try {
      let routines = await this.handleGetRoutines();
      routines = routines.map(routine => {
        routine.workouts = routine.workouts.filter(workout => workout.workoutId !== workoutId);
        return routine;
      });
      await firebase
        .database()
        .ref(`/users/${userId}/`)
        .update({ routines });
    } catch (err) {
      console.warn('Unable to remove workout from routines.');
      console.warn(err.code, err.message);
    }
  };

  render() {
    return <AdminContext.Provider value={this.state}>{this.props.children}</AdminContext.Provider>;
  }
}

AdminContextComponent.propTypes = {};

export default AdminContextComponent;
