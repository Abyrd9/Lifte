import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

class WorkoutListener extends Component {
  state = {
    workout: {}
  };

  componentDidMount() {
    const { workoutId } = this.props;
    if (workoutId) {
      this.handleSetListener(workoutId);
    }
  }

  componentDidUpdate(prevProps) {
    const { workoutId } = this.props;
    if (prevProps.workoutId !== workoutId) {
      if (prevProps.workoutId) {
        this.handleRemoveListener(prevProps.workoutId);
      }
      if (workoutId) {
        this.handleSetListener(workoutId);
      }
    }
  }

  componentWillUnmount() {
    const { workoutId } = this.props;
    if (workoutId) {
      this.handleRemoveListener(workoutId);
    }
  }

  handleSetListener = workoutId => {
    const auth = firebase.auth();
    if (!!auth.currentUser) {
      const userId = auth.currentUser.uid;
      firebase
        .database()
        .ref(`/users/${userId}/workouts/${workoutId}`)
        .on('value', snapshot => {
          let workout = snapshot.val();
          workout ? (workout = workout) : (workout = {});
          this.setState({ workout });
        });
    }
  };

  handleRemoveListener = workoutId => {
    const auth = firebase.auth();
    if (!!auth.currentUser) {
      const userId = auth.currentUser.uid;
      firebase
        .database()
        .ref(`users/${userId}/workouts/${workoutId}`)
        .off();
    }
  };

  render() {
    return this.props.children(this.state);
  }
}

WorkoutListener.propTypes = {
  workoutId: PropTypes.string.isRequired
};

export default WorkoutListener;
