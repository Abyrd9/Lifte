import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import firebase from 'firebase';
import AdminWorkoutListItem from './AdminWorkoutListItem';
import AdminRoutineListItem from './AdminRoutineListItem';
import {
  RoutineWorkoutList,
  RoutineWorkoutListItem
} from './AdminListItemElements';

class AdminWorkoutList extends Component {
  state = {
    workouts: [],
    routines: []
  };

  componentDidMount() {
    const userId = 'DJjKXxB7aVeJPmlZ2EdeBn5KAvr2';
    firebase
      .database()
      .ref(`users/${userId}/workouts/`)
      .on('value', snapshot => {
        let workoutList = snapshot.val();
        workoutList
          ? (workoutList = Object.values(workoutList))
          : (workoutList = []);
        this.setState({ workouts: workoutList });
      });
    firebase
      .database()
      .ref(`users/${userId}/routines/`)
      .on('value', snapshot => {
        let routineList = snapshot.val();
        routineList
          ? (routineList = Object.values(routineList))
          : (routineList = []);
        this.setState({ routines: routineList });
      });
  }

  componentWillUnmount() {
    const userId = 'DJjKXxB7aVeJPmlZ2EdeBn5KAvr2';
    firebase
      .database()
      .ref(`users/${userId}/workouts/`)
      .off();
    firebase
      .database()
      .ref(`users/${userId}/routines/`)
      .off();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.type === 'routines' && (
          <React.Fragment>
            {this.state.routines.map(routine => {
              const workoutList = routine.workouts.map(routineWorkout => {
                const fullWorkout = this.state.workouts.find(
                  workout => workout.key === routineWorkout.workoutId
                );
                return fullWorkout;
              });
              return (
                <AdminRoutineListItem
                  name={routine.name}
                  sessionLength={routine.sessionLength}
                  currentSession={routine.currentSession}
                  workouts={workoutList}
                  routineId={routine.key}
                  key={routine.key}>
                  <RoutineWorkoutList name="Workouts:">
                    {!!workoutList &&
                      workoutList.map(workout => (
                        <RoutineWorkoutListItem
                          name={workout.name}
                          weight={workout.startingWeight}
                          sets={workout.sets}
                          reps={workout.reps}
                        />
                      ))}
                  </RoutineWorkoutList>
                </AdminRoutineListItem>
              );
            })}
          </React.Fragment>
        )}
        {this.props.type === 'workouts' && (
          <React.Fragment>
            {this.state.workouts.map(workout => (
              <AdminWorkoutListItem
                name={workout.name}
                sets={workout.sets}
                reps={workout.reps}
                startingWeight={workout.startingWeight}
                weightToAdd={workout.weightToAdd}
                workoutId={workout.key}
                key={workout.key}
              />
            ))}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

AdminWorkoutList.propTypes = {};

export default AdminWorkoutList;
