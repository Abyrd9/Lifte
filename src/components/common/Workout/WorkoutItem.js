import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { AdminContext } from '../Contexts/AdminContext';
import WorkoutItemContent from './WorkoutItemContent';
import WorkoutItemEdit from './WorkoutItemEdit';

const ItemContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      display: flex;
      align-items: center;
      padding: 12px 0px;
      border-bottom: 1px solid ${theme.colors.blackSecondary};
      &:first-of-type {
        margin-top: 45px;
        border-top: 1px solid ${theme.colors.blackSecondary};
      }
      &:last-of-type {
        margin-bottom: 45px;
      }
    `;
  }}
`;

class WorkoutItem extends Component {
  static contextType = AdminContext;
  state = { isEditable: false };
  render() {
    const {
      name,
      weight,
      sets,
      reps,
      isCompleted,
      routineId,
      workoutId,
      currentSession
    } = this.props;
    return (
      <ItemContainer>
        {this.state.isEditable ? (
          <WorkoutItemEdit
            name={name}
            weight={weight}
            sets={sets}
            reps={reps}
            updateWorkout={workout =>
              this.context.handleUpdateRoutineWorkout(
                routineId,
                workoutId,
                workout,
                currentSession
              )
            }
            toggleEdit={() => this.setState({ isEditable: false })}
          />
        ) : (
          <WorkoutItemContent
            name={name}
            weight={weight}
            sets={sets}
            reps={reps}
            isCompleted={isCompleted}
            updateWorkout={() =>
              this.context.handleUpdateRoutineWorkoutValue(
                routineId,
                workoutId,
                'completed',
                !isCompleted
              )
            }
            toggleEdit={() => this.setState({ isEditable: true })}
          />
        )}
      </ItemContainer>
    );
  }
}

WorkoutItem.propTypes = {};

export default WorkoutItem;
