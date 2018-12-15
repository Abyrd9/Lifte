import React, { Component, Fragment } from 'react';
import { Background, Container, Divider } from './common/LayoutElements';
import Header from './common/Header/Header';
import PageTitle from './common/PageTitle/PageTitle';
import GoalWeightListener from './contexts/GoalWeightListener';
import HomeGoalWeight from './common/HomeGoalWeight/HomeGoalWeight';
import RoutinesListener from './contexts/RoutinesListener';
import Dropdown from './common/Dropdown/Dropdown';
import RoutineListener from './contexts/RoutineListener';
import HomeButtonList from './common/HomeButtonList/HomeButtonList';
import HomeSessionItem from './common/HomeSessionItem/HomeSessionItem';
import HomeFooterButton from './common/HomeFooterButton/HomeFooterButton';

class Home extends Component {
  state = {
    isEditable: false,
    currentRoutine: {},
    currentActiveWorkoutId: ''
  };
  render() {
    const { currentRoutine, currentActiveWorkoutId } = this.state;
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
            {({ routine }) => (
              <HomeButtonList
                routine={routine}
                clearActiveWorkoutId={() => this.setState({ currentActiveWorkoutId: '' })}
              />
            )}
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
                  routine.workouts.map(workout => (
                    <Fragment>
                      <HomeSessionItem
                        routineId={currentRoutine.routineId}
                        workout={workout}
                        isActive={workout.workoutId === currentActiveWorkoutId}
                        setIsActive={() => {
                          if (currentActiveWorkoutId === workout.workoutId) {
                            this.setState({ currentActiveWorkoutId: '' });
                          } else {
                            this.setState({ currentActiveWorkoutId: workout.workoutId });
                          }
                        }}
                        currentSessionIndex={routine.currentSession}
                      />
                      <Divider />
                    </Fragment>
                  ))
                }
              </RoutineListener>
            </Fragment>
          )}
        </Container>
        <HomeFooterButton />
      </Background>
    );
  }
}

export default Home;
