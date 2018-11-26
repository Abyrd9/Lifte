import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { AdminContext } from '../Contexts/AdminContext';
import { NameInput, NumberBlock, NumberSetsReps } from './AdminModalElements';
import AdminModalButtons from './AdminModalButtons';

const Container = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      .number-block {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span {
          margin: 0px 15px;
          display: inline-block;
          width: 1px;
          height: 30px;
          background-color: ${theme.colors.whiteSecondary};
        }
      }
    `;
  }}
`;

class WorkoutModalContent extends Component {
  static contextType = AdminContext;
  state = {
    name: '',
    startingWeight: '',
    weightToAdd: '',
    sets: '',
    reps: ''
  };

  componentDidMount() {
    if (!!this.props.initialWorkout) {
      this.setState({ ...this.props.initialWorkout });
    }
  }

  handleChangeValue = (val, key, limit) => {
    if (val.length < limit) {
      this.setState({ [key]: val });
    }
  };

  handleActionClick = () => {
    switch (this.props.type) {
      case 'create': {
        this.context.handleCreateWorkout(this.state);
        break;
      }
      case 'edit': {
        this.context.handleUpdateWorkout(this.state, this.props.workoutId);
        break;
      }
      default:
        return;
    }
  };

  render() {
    const disabled = !Object.values(this.state).every(val => val.length > 0);
    return (
      <React.Fragment>
        <Container>
          <NameInput
            title="Name:"
            placeholder="Workout Name..."
            value={this.state.name}
            onChange={e => this.handleChangeValue(e.target.value, 'name', 26)}
          />
          <div className="number-block">
            <NumberBlock
              title="Starting Weight:"
              type="number"
              placeholder="0"
              value={this.state.startingWeight}
              onChange={e =>
                this.handleChangeValue(e.target.value, 'startingWeight', 4)
              }
            />
            <span />
            <NumberBlock
              title="Weight To Add:"
              type="number"
              placeholder="0"
              value={this.state.weightToAdd}
              onChange={e =>
                this.handleChangeValue(e.target.value, 'weightToAdd', 3)
              }
            />
          </div>
          <NumberSetsReps
            title="Sets & Reps:"
            type="number"
            setPlaceholder="0"
            repPlaceholder="0"
            setValue={this.state.sets}
            repValue={this.state.reps}
            onSetChange={e => this.handleChangeValue(e.target.value, 'sets', 3)}
            onRepChange={e => this.handleChangeValue(e.target.value, 'reps', 3)}
          />
        </Container>
        <AdminModalButtons
          onCancelClick={() => this.props.closeModal()}
          onActionClick={() => {
            this.handleActionClick();
            this.props.closeModal();
          }}
          disabled={disabled}
        />
      </React.Fragment>
    );
  }
}

WorkoutModalContent.propTypes = {};

export default WorkoutModalContent;
