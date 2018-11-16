import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Background from './common/Background';
import AddButton from './common/AddButton';
import GoalWeight from './common/GoalWeight';

const WorkoutContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      box-sizing: border-box;
      background-color: #fff;
      width: 100%;
      z-index: ${theme.zIndex.middle};
      box-shadow: ${theme.shadow};
      border-radius: 2px;
      padding: 10px;
    `;
  }}
`;

class Workout extends Component {
  render() {
    return (
      <Background>
        <WorkoutContainer>
          <GoalWeight weight={180} />
        </WorkoutContainer>
        <AddButton icon="edit" />
      </Background>
    );
  }
}

Workout.propTypes = {};

export default Workout;
