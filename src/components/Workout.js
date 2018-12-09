import React, { Component } from 'react';
import firebase from 'firebase';
import { Background, Container } from './common/Layout';
import WorkoutTitle from './common/Workout/WorkoutTitle';
import Header from './common/Header';
import FooterButtonsContainer from './common/FooterButtonsContainer';
import RoutineValueListener from './contexts/RoutineListener';
import AdminContextComponent from './contexts/AdminContext';
import WorkoutRoutineSelector from './common/Workout/WorkoutRoutineSelector';
import WorkoutButtonList from './common/Workout/WorkoutButtonList';
import WorkoutItem from './common/Workout/WorkoutItem';

class Workout extends Component {
  state = {
    isEditable: false,
    routines: [],
    workouts: [],
    currentRoutine: {
      name: '',
      routineId: ''
    }
  };
  render() {
    const { currentRoutine, isEditable } = this.state;
    return (
      <Background hasContainer>
        <Header />
        <AdminContextComponent>
          <Container>
            <WorkoutTitle isEditable={isEditable} />
          </Container>
          {!!currentRoutine.key && (
            <RoutineValueListener routineId={currentRoutine.key}>
              {routine => {
                if (!!routine.value) {
                  return (
                    <WorkoutButtonList
                      routineId={routine.value.key}
                      sessionLength={routine.value.sessionLength}
                      currentSession={routine.value.currentSession + 1}
                    />
                  );
                }
                return null;
              }}
            </RoutineValueListener>
          )}
          <Container>
            <WorkoutRoutineSelector
              onClick={val => this.setState({ currentRoutine: val })}
              name={currentRoutine.name}
            />
            {!!currentRoutine.key && (
              <RoutineValueListener routineId={currentRoutine.key}>
                {routine => {
                  if (!!routine.value) {
                    const { workouts, currentSession } = routine.value;
                    const index = parseInt(currentSession);
                    return (
                      <React.Fragment>
                        {workouts.map(workout => (
                          <WorkoutItem
                            key={workout.key}
                            routineId={currentRoutine.key}
                            workoutId={workout.key}
                            name={workout.name}
                            weight={workout.sessions[index].weight}
                            sets={workout.sessions[index].sets}
                            reps={workout.sessions[index].reps}
                            isCompleted={workout.sessions[index].completed}
                            currentSession={currentSession}
                          />
                        ))}
                      </React.Fragment>
                    );
                  }
                  return null;
                }}
              </RoutineValueListener>
            )}
          </Container>
        </AdminContextComponent>
        <FooterButtonsContainer
          isEditable={isEditable}
          onEditClick={() => this.setState({ isEditable: !isEditable })}
        />
      </Background>
    );
  }
}

export default Workout;
