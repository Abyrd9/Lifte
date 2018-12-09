import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { AdminContext } from '../../contexts//AdminContext';

const WorkoutButtonListContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
      max-width: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin: 15px auto;
    `;
  }}
`;

export const WorkoutButtonListItem = styled.button`
  ${props => {
    const { theme } = props;
    return css`
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      box-shadow: ${theme.shadow};
      background-color: ${props.isActive
        ? theme.colors.secondary
        : theme.colors.white};
      color: ${props.isActive
        ? theme.colors.white
        : theme.colors.gray};
      ${theme.font(18, 600)};
      margin: 5px 5px;
    `;
  }}
`;

class WorkoutButtonList extends Component {
  static contextType = AdminContext;
  render() {
    const { routineId, sessionLength, currentSession } = this.props;
    const buttonList = [];

    if (!!sessionLength) {
      for (let i = 0; i < sessionLength; i++) {
        buttonList.push(
          <WorkoutButtonListItem
            onClick={() =>
              this.context.handleUpdateRoutineValue(
                routineId,
                'currentSession',
                i
              )
            }
            isActive={currentSession - 1 === i}>
            {i + 1}
          </WorkoutButtonListItem>
        );
      }
    }

    return (
      <WorkoutButtonListContainer>
        {buttonList.map(buttonListItem => buttonListItem)}
      </WorkoutButtonListContainer>
    );
  }
}

WorkoutButtonList.propTypes = {};

export default WorkoutButtonList;
