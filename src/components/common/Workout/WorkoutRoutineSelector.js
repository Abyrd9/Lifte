import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Dropdown from '../Dropdown';
import { AdminContext } from '../Contexts/AdminContext';

class WorkoutRoutineSelector extends Component {
  state = {
    currentSession: 0,
    key: '',
    name: '',
    sessionLength: 0,
    workouts: []
  };
  static contextType = AdminContext;

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <Dropdown placeholder="Choose Your Routine..." value={this.props.currentRoutine}>
          {this.context.allRoutines.map(routine => (
            <button onClick={() => this.props.onClick(routine)}>{routine.name}</button>
          ))}
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default WorkoutRoutineSelector;
