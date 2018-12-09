import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Dropdown from '../Dropdown';
import RoutinesListener from '../../contexts//RoutinesListener';

class WorkoutRoutineSelector extends Component {
  render() {
    return (
      <React.Fragment>
        <Dropdown
          placeholder="Choose Your Routine..."
          value={this.props.name.length > 0 && this.props.name}>
          <RoutinesListener>
            {list =>
              list.routines.map(routine => (
                <button onClick={() => this.props.onClick(routine)}>{routine.name}</button>
              ))
            }
          </RoutinesListener>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default WorkoutRoutineSelector;
