import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import { Background, Container, Divider } from './common/LayoutElements';
import WorkoutTitle from './common/Workout/WorkoutTitle';
import FooterButtonsContainer from './common/FooterButtonsContainer';
import RoutineValueListener from './contexts/RoutineListener';
import AdminContextComponent from './contexts/AdminContext';
import WorkoutRoutineSelector from './common/Workout/WorkoutRoutineSelector';
import WorkoutButtonList from './common/Workout/WorkoutButtonList';
import WorkoutItem from './common/Workout/WorkoutItem';

// New Components
import Header from './common/Header/Header';
import PageTitle from './common/PageTitle/PageTitle';
import GoalWeightListener from './contexts/GoalWeightListener';
import HomeGoalWeight from './common/HomeGoalWeight/HomeGoalWeight';
import RoutinesListener from './contexts/RoutinesListener';
import Dropdown from './common/Dropdown/Dropdown';
import RoutineListener from './contexts/RoutineListener';
import HomeButtonList from './common/HomeButtonList/HomeButtonList';

class Home extends Component {
  state = {
    isEditable: false,
    currentRoutine: {}
  };
  render() {
    const { currentRoutine, isEditable } = this.state;
    return (
      <Background hasContainer>
        <Header />
        <Container>
          <PageTitle title="Goal Weight:" />
          <GoalWeightListener>
            {({ weight }) => <HomeGoalWeight weight={weight} />}
          </GoalWeightListener>
        </Container>

        {!!currentRoutine && currentRoutine.hasOwnProperty('routineId') && (
          <RoutineListener routineId={currentRoutine.routineId}>
            {({ routine }) => <HomeButtonList routine={routine} />}
          </RoutineListener>
        )}

        <Container>
          <Dropdown
            placeholder="Choose Your Routine..."
            value={!!currentRoutine ? currentRoutine.name : ''}>
            <RoutinesListener>
              {({ routines }) =>
                !!routines &&
                routines.length > 0 &&
                routines.map(routine => (
                  <button onClick={() => this.setState({ currentRoutine: routine })}>
                    {routine.name}
                  </button>
                ))
              }
            </RoutinesListener>
          </Dropdown>

          {!!currentRoutine && currentRoutine.hasOwnProperty('routineId') && (
            <Fragment>
              <Divider />
              <RoutineListener routineId={currentRoutine.routineId}>
                {({ routine }) =>
                  !!routine.workouts &&
                  routine.workouts.length > 0 &&
                  routine.workouts.map(workout => <div>{workout.name}</div>)
                }
              </RoutineListener>
            </Fragment>
          )}
        </Container>

        {/* <AdminContextComponent>
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
        /> */}
      </Background>
    );
  }
}

export default Home;
