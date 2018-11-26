import React, { Component } from 'react';
import PropTypes from 'prop-types';

const WorkoutDataContext = React.createContext('workout');

class WorkoutContext extends Component {
  state = {
    selectedRoutine: {},
    selectedRoutine: routine => {
      this.setState({ selectedRoutine: routine });
    }
  };

  render() {
    return (
      <WorkoutDataContext.Provider value={this.state}>
        {this.props.children}
      </WorkoutDataContext.Provider>
    );
  }
}

WorkoutContext.propTypes = {};

export default WorkoutContext;
