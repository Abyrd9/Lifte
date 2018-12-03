import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CheckIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.secondary};
      font-size: 24px;
      position: absolute;
      top: -4px;
      left: 0px;
    `;
  }}
`;

const ItemContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      display: flex;
      align-items: center;
      padding: 10px 0px;
      border-bottom: 1px solid ${theme.colors.blackSecondary};
      &:first-of-type {
        border-top: 1px solid ${theme.colors.blackSecondary};
      }
      h2 {
        ${theme.font(18, 400)};
        color: ${theme.colors.black};
      }
      h1 {
        ${theme.font(18, 700)};
        color: ${theme.colors.black};
        margin-left: 3px;
      }
      span {
        width: 1px;
        height: 20px;
        background-color: ${theme.colors.blackSecondary};
        margin: 0px 5px;
        align-self: center;
      }
      p {
        ${theme.font(14, 400)};
        color: ${theme.colors.blackSecondary};
      }
      div {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 100%;
        button {
          height: 20px;
          width: 20px;
          border-radius: 100%;
          border: 1px solid ${theme.colors.blackSecondary};
          position: relative;
          margin-right: 5px;
        }
      }
    `;
  }}
`;

class WorkoutItem extends Component {
  render() {
    const { name, weight, sets, reps, isCompleted } = this.props;
    console.log(isCompleted);
    return (
      <ItemContainer>
        <h2>{name} - </h2>
        <h1>{weight}lbs</h1>
        <span />
        <p>
          {sets}x{reps}
        </p>
        <div>
          <button>{isCompleted && <CheckIcon icon="check" />}</button>
        </div>
      </ItemContainer>
    );
  }
}

WorkoutItem.propTypes = {};

export default WorkoutItem;
