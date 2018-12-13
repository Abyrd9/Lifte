import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../../../helpers/api';
import { HomeButtonListContainer, HomeButtonListItem } from './HomeButtonList.styles';

const HomeButtonList = ({ routine }) => {
  const updateRoutineCurrentSession = index => {
    const newRoutine = JSON.parse(JSON.stringify(routine));
    newRoutine.currentSession = index;
    console.log(newRoutine);
    api.handleUpdateRoutine(newRoutine.routineId, newRoutine);
  };

  const { currentSession, sessionLength, workouts } = routine;
  const buttonList = [];

  if (!!sessionLength) {
    for (let i = 0; i < parseInt(sessionLength); i++) {
      let isComplete = false;
      if (!!workouts && workouts.length > 0) {
        isComplete = workouts.every(workout => {
          if (!!workout.sessions && !!workout.sessions[i]) {
            return workout.sessions[i].completed;
          }
        });
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
  }).isRequired
};

export default HomeButtonList;