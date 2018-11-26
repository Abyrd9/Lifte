import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { AdminContext } from '../Contexts/AdminContext';
import {
  NameInput,
  NumberBlock,
  RoutineWorkoutList,
  RoutineWorkoutListItem
} from './AdminModalElements';
import Dropdown from '../Dropdown';
import { Divider } from '../Layout';
import AdminModalButtons from './AdminModalButtons';

const Container = styled.div`
  ${props => {
    const { theme } = props;
    return css``;
  }}
`;

class RoutineModalContent extends Component {
  static contextType = AdminContext;
  state = {
    name: '',
    sessionLength: '',
    currentSession: '1',
    workouts: []
  };

  componentDidMount() {
    if (!!this.props.initialRoutine) {
      this.setState({ ...this.props.initialRoutine });
    }
  }

  handleRemoveWorkout = index => {
    const newWorkouts = this.state.workouts.filter((workout, i) => i !== index);
    this.setState({ workouts: newWorkouts });
  };

  handleCreateRoutineWorkout = workout => {
    const routineWorkout = {
      name: workout.name,
      workoutId: workout.key,
      sessions: []
    };
    for (let i = 0; i < this.state.sessionLength; i++) {
      let sessions = [];
      for (let i = 0; i < this.state.sessionLength; i++) {
        sessions.push({ completed: false, index: i });
      }
      routineWorkout.sessions.push({
        index: i,
        sessionCompleted: false,
        sessions
      });
    }
    this.setState({ workouts: [...this.state.workouts, routineWorkout] });
  };

  handleChangeSessionLength = (val, limit) => {
    const newWorkouts = this.state.workouts.map(workout => {
      const newSessions = workout.sessions.filter((session, i) => i < val);
      return {
        name: workout.name,
        workoutId: workout.workoutId,
        sessions: newSessions
      };
    });
    if (val.length < limit) {
      this.setState({ sessionLength: val, workouts: newWorkouts });
    }
  };

  handleChangeValue = (val, key, limit) => {
    if (val.length < limit) {
      this.setState({ [key]: val });
    }
  };

  handleActionClick = () => {
    switch (this.prop.type) {
      case 'create': {
        this.context.handleCreateRoutine(this.state);
        break;
      }
      case 'edit': {
        this.context.handleUpdateRoutine(this.state);
        break;
      }
      default:
        return;
    }
  };

  render() {
    const disabled = !Object.values(this.state).every(val => val.length > 0);
    const { allWorkouts } = this.context;
    return (
      <React.Fragment>
        <Container>
          <NameInput
            title="Name:"
            placeholder="Routine Name..."
            value={this.state.name}
            onChange={e => this.handleChangeValue(e.target.value, 'name', 26)}
          />
          <NumberBlock
            title="# of Sessions:"
            placeholder="0"
            value={this.state.sessionLength}
            onChange={e => this.handleChangeSessionLength(e.target.value, 3)}
          />
          <Dropdown placeholder="Add Workouts...">
            {allWorkouts.map(workout => (
              <button onClick={() => this.handleCreateRoutineWorkout(workout)}>
                {workout.name}
              </button>
            ))}
          </Dropdown>
          <RoutineWorkoutList>
            {this.state.workouts.map((workout, i) => (
              <RoutineWorkoutListItem
                name={workout.name}
                onClick={() => this.handleRemoveWorkout(i)}
              />
            ))}
          </RoutineWorkoutList>
          <Divider />
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

RoutineModalContent.propTypes = {};

export default RoutineModalContent;
