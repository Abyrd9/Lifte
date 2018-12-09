import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.secondary};
      font-size: 18px;
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

const TitleInput = styled.input`
  ${props => {
    const { theme } = props;
    return css`
      display: flex;
      align-items: center;
      ${theme.font(22, 800)};
      color: ${theme.colors.black};
      background-color: transparent;
      border: none;
      border-bottom: 1px solid ${theme.colors.gray};
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
      input {
        ${theme.font(18, 400)};
        color: ${theme.colors.black};
        background-color: transparent;
        border: none;
        border-bottom: 1px solid ${theme.colors.gray};
        max-width: 22px;
        &:first-of-type {
          max-width: 32px;
        }
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
        margin: 0px 10px;
      }
    `;
  }}
`;

const ButtonBlock = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 22px;
        width: 22px;
      }
    `;
  }}
`;

class WorkoutItemContent extends Component {
  state = {
    name: this.props.name,
    weight: this.props.weight,
    sets: this.props.sets,
    reps: this.props.reps
  };

  handleChangeValue = (val, key, limit) => {
    if (val.length < limit) {
      this.setState({ [key]: val });
    }
  };

  render() {
    const { updateWorkout, toggleEdit } = this.props;
    const { name, weight, sets, reps } = this.state;
    return (
      <React.Fragment>
        <ContentContainer>
          <TitleInput
            value={name}
            onChange={e => this.handleChangeValue(e.target.value, 'name', 26)}
          />
          <WeightBlock>
            <input
              type="number"
              value={weight}
              onChange={e =>
                this.handleChangeValue(e.target.value, 'weight', 4)
              }
            />
            <span />
            <input
              type="number"
              value={sets}
              onChange={e => this.handleChangeValue(e.target.value, 'sets', 3)}
            />
            <p>x</p>
            <input
              type="number"
              value={reps}
              onChange={e => this.handleChangeValue(e.target.value, 'reps', 3)}
            />
          </WeightBlock>
        </ContentContainer>
        <ButtonBlock>
          <button
            onClick={() => {
              updateWorkout(this.state);
              toggleEdit();
            }}>
            <Icon icon="save" />
          </button>
          <button onClick={() => toggleEdit()}>
            <Icon icon="times-circle" />
          </button>
        </ButtonBlock>
      </React.Fragment>
    );
  }
}

WorkoutItemContent.propTypes = {};

export default WorkoutItemContent;
