import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminWorkoutListItem from './AdminWorkoutListItem';
import AdminRoutineListItem from './AdminRoutineListItem';
import {
  RoutineWorkoutList,
  RoutineWorkoutListItem
} from './AdminListItemElements';
import WorkoutsListener from '../../contexts//WorkoutsListener';
import RoutinesListener from '../../contexts//RoutinesListener';

class AdminWorkoutList extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.type === 'routines' && (
          <RoutinesListener>
            {list =>
              list.routines.map(routine => (
                <AdminRoutineListItem
                  name={routine.name}
                  sessionLength={routine.sessionLength}
                  currentSession={routine.currentSession}
                  workouts={routine.workouts}
                  routineId={routine.key}
                  key={routine.key}>
                  <RoutineWorkoutList name="Workouts:">
                    <React.Fragment>
                      <WorkoutsListener>
                        {list => {
                          if (list.workouts.length) {
                            const workoutList = routine.workouts.map(
                              routineWorkout => {
                                const fullWorkout = list.workouts.find(
                                  workout => workout.key === routineWorkout.key
                                );
                                return fullWorkout;
                              }
                            );
                            return (
                              <React.Fragment>
                                {workoutList.map(workout => {
                                  if (!!workout) {
                                    return (
                                      <RoutineWorkoutListItem
                                        name={workout.name}
                                        weight={workout.startingWeight}
                                        sets={workout.sets}
                                        reps={workout.reps}
                                      />
                                    );
                                  }
                                })}
                              </React.Fragment>
                            );
                          } else {
                            return null;
                          }
                        }}
                      </WorkoutsListener>
                    </React.Fragment>
                  </RoutineWorkoutList>
                </AdminRoutineListItem>
              ))
            }
          </RoutinesListener>
        )}
        {this.props.type === 'workouts' && (
          <WorkoutsListener>
            {list =>
              list.workouts.map(workout => (
                <AdminWorkoutListItem
                  name={workout.name}
                  sets={workout.sets}
                  reps={workout.reps}
                  startingWeight={workout.startingWeight}
                  weightToAdd={workout.weightToAdd}
                  workoutId={workout.key}
                  key={workout.key}
                />
              ))
            }
          </WorkoutsListener>
        )}
      </React.Fragment>
    );
  }
}

AdminWorkoutList.propTypes = {};

export default AdminWorkoutList;
