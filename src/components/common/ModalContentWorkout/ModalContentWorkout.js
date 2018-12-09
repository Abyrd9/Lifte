import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AdminContext } from '../../contexts/AdminContext';
import { ModalContentWorkoutContainer } from './ModalContentWorkout.styles';
import ModalTitle from '../ModalTitle/ModalTitle';
import ModalInput from '../ModalInput/ModalInput';

class ModalContentWorkout extends Component {
  static contextType = AdminContext;
  state = {
    name: '',
    startingWeight: '0',
    weightToAdd: '0',
    sets: '0',
    reps: '0',
    time: {
      minutes: '00',
      seconds: '00'
    }
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

  render() {
    return (
      <ModalContentWorkoutContainer>
        <ModalTitle title="Create New Workout" />
        <ModalInput />
      </ModalContentWorkoutContainer>
    );
  }
}

ModalContentWorkout.propTypes = {};

export default ModalContentWorkout;
