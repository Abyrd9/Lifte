import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HomeSessionItemContainer } from './HomeSessionItem.styles';
import HomeSessionItemBlock from '../HomeSessionItemBlock/HomeSessionItemBlock';
import HomeSessionItemEdit from '../HomeSessionItemEdit/HomeSessionItemEdit';

class HomeSessionItem extends Component {
  render() {
    const { workout, isActive, setIsActive, currentSessionIndex, routineId } = this.props;
    const {
      name,
      time: { minutes, seconds },
      sessions
    } = workout;
    const { reps, sets, weight, completed } = sessions[currentSessionIndex];
    return (
      <HomeSessionItemContainer onClick={setIsActive}>
        {isActive ? (
          <HomeSessionItemEdit
            workout={workout}
            currentSessionIndex={currentSessionIndex}
            routineId={routineId}
          />
        ) : (
          <HomeSessionItemBlock
            name={name}
            weight={weight}
            sets={sets}
            reps={reps}
            minutes={minutes}
            seconds={seconds}
            isCompleted={completed}
          />
        )}
      </HomeSessionItemContainer>
    );
  }
}

HomeSessionItem.propTypes = {
  workout: PropTypes.oneOfType({
    name: PropTypes.string.isRequired,
    time: PropTypes.oneOfType({
      minutes: PropTypes.string.isRequired,
      seconds: PropTypes.string.isRequired
    }),
    sessions: PropTypes.oneOfType([
      {
        completed: PropTypes.bool.isRequired,
        sets: PropTypes.string.isRequired,
        reps: PropTypes.string.isRequired,
        weight: PropTypes.string.isRequired,
        completedSetsArr: PropTypes.oneOfType([
          {
            completed: PropTypes.bool.isRequired
          }
        ])
      }
    ])
  })
};

export default HomeSessionItem;
