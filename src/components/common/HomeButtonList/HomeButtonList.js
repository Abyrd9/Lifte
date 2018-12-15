import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../../../helpers/api';
import { HomeButtonListContainer, HomeButtonListItem } from './HomeButtonList.styles';

const HomeButtonList = ({ routine, clearActiveWorkoutId }) => {
  const updateRoutineCurrentSession = index => {
    clearActiveWorkoutId();
    const newRoutine = JSON.parse(JSON.stringify(routine));
    newRoutine.currentSession = index;
    api.handleUpdateRoutine(newRoutine.routineId, newRoutine);
  };

  const { currentSession, sessionLength, workouts } = routine;
  const buttonList = [];

  if (!!sessionLength) {
    for (let i = 0; i < parseInt(sessionLength); i++) {
      let isComplete = false;
      if (!!workouts && workouts.length > 0) {
        isComplete = workouts.every(workout => workout.sessions[i].completed);
      }
      buttonList.push(
        <HomeButtonListItem
          onClick={() => updateRoutineCurrentSession(i)}
          isActive={parseInt(currentSession) === i}
          isComplete={isComplete}>
          {i + 1}
        </HomeButtonListItem>
      );
    }
  }

  return (
    <HomeButtonListContainer>
      {!!buttonList && buttonList.length > 0 && buttonList.map(buttonListItem => buttonListItem)}
    </HomeButtonListContainer>
  );
};

HomeButtonList.propTypes = {
  routine: PropTypes.oneOfType({
    currentSession: PropTypes.string.isRequired,
    sessionLength: PropTypes.string.isRequired,
    routineId: PropTypes.string.isRequired,
    workouts: PropTypes.oneOfType([
      {
        sessions: PropTypes.oneOfType({
          completed: PropTypes.bool.isRequired
        }).isRequired
      }
    ]).isRequired
  }).isRequired,
  clearActiveWorkoutId: PropTypes.func.isRequired
};

export default HomeButtonList;
