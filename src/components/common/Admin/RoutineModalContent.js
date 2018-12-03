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
import WorkoutsListener from '../Contexts/WorkoutsListener';

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
      const {
        name,
        sessionLength,
        currentSession,
        workouts
      } = this.props.initialRoutine;
      this.setState({ name, sessionLength, currentSession, workouts });
    }
  }

  handleRemoveWorkout = index => {
    const newWorkouts = this.state.workouts.filter((workout, i) => i !== index);
    this.setState({ workouts: newWorkouts });
  };

  handleCreateRoutineWorkout = workout => {
    const routineWorkout = {
      name: workout.name,
      key: workout.key,
      sessions: []
    };
    let weight = parseInt(
      workout.startingWeight - parseInt(workout.weightToAdd)
    );
    for (let i = 0; i < this.state.sessionLength; i++) {
      weight = weight + parseInt(workout.weightToAdd);
      routineWorkout.sessions.push({
        completed: false,
        index: i,
        sets: workout.sets,
        reps: workout.reps,
        weight: weight
      });
    }
    this.setState({ workouts: [...this.state.workouts, routineWorkout] });
  };

  handleChangeSessionLength = (val, limit) => {
    if (val.length < limit) {
      const newWorkouts = this.updateSessionLength(val);
      this.setState({ sessionLength: val, workouts: newWorkouts });
    }
  };

  updateSessionLength = sessionLength => {
    const { workouts } = this.state;
    const workoutsWithUpdatedSessionLength = workouts.map(workout => {
      let newSessions = [];
      for (let i = 0; i < sessionLength; i++) {
        let sessionCompletedValue;
        !!workout.sessions[i]
          ? (sessionCompletedValue = workout.sessions[i].completed)
          : (sessionCompletedValue = false);
        newSessions.push({ completed: sessionCompletedValue, index: i });
      }
      workout.sessions = newSessions;
      return workout;
    });
    return workoutsWithUpdatedSessionLength;
  };

  handleChangeValue = (val, key, limit) => {
    if (val.length < limit) {
      this.setState({ [key]: val });
    }
  };

  handleActionClick = () => {
    switch (this.props.type) {
      case 'create': {
        this.context.handleCreateRoutine(this.state);
        break;
      }
      case 'edit': {
        this.context.handleUpdateRoutine(this.state, this.props.routineId);
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
            <WorkoutsListener>
              {list =>
                list.workouts.map(workout => (
                  <button
                    onClick={() => this.handleCreateRoutineWorkout(workout)}>
                    {workout.name}
                  </button>
                ))
              }
            </WorkoutsListener>
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
