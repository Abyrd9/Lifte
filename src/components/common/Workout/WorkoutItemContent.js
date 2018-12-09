import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.secondary};
      font-size: 18px;
      margin-left: 10px;
      margin-bottom: 1px;
    `;
  }}
`;

const CheckIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.secondary};
      font-size: 23px;
      margin-top: -1px;
    `;
  }}
`;

const ContentContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      flex: 1;
    `;
  }}
`;

const TitleBlock = styled.h2`
  ${props => {
    const { theme } = props;
    return css`
      display: flex;
      align-items: center;
      ${theme.font(22, 800)};
      color: ${theme.colors.black};
    `;
  }}
`;

const WeightBlock = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      margin-top: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      h1 {
        ${theme.font(20, 400)};
        color: ${theme.colors.black};
      }
      span {
        display: inline-block;
        width: 1px;
        height: 22px;
        background-color: ${theme.colors.gray};
        margin: 0px 10px;
        align-self: center;
      }
      p {
        ${theme.font(16, 400)};
        color: ${theme.colors.gray};
      }
    `;
  }}
`;

const ButtonBlock = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin: 0px 5px 0px 10px;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 22px;
        width: 22px;
        border-radius: 100%;
        border: 1px solid ${theme.colors.gray};
        position: relative;
      }
    `;
  }}
`;

class WorkoutItemContent extends Component {
  render() {
    const {
      name,
      weight,
      sets,
      reps,
      isCompleted,
      updateWorkout,
      toggleEdit
    } = this.props;
    return (
      <React.Fragment>
        <ContentContainer>
          <TitleBlock>
            {name}{' '}
            {!isCompleted && <EditIcon icon="edit" onClick={toggleEdit} />}
          </TitleBlock>
          <WeightBlock>
            <h1>{weight}lbs</h1>
            <span />
            <p>
              {sets}x{reps}
            </p>
          </WeightBlock>
        </ContentContainer>
        <ButtonBlock>
          <button onClick={updateWorkout}>
            {isCompleted && <CheckIcon icon="check-circle" />}
          </button>
        </ButtonBlock>
      </React.Fragment>
    );
  }
}

WorkoutItemContent.propTypes = {};

export default WorkoutItemContent;
