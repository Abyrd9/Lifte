import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

class WorkoutsListener extends Component {
  state = {
    workouts: []
  };

  componentDidMount() {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/users/${userId}/workouts/`)
      .on('value', snapshot => {
        let workoutList = snapshot.val();
        workoutList
          ? (workoutList = Object.values(workoutList))
          : (workoutList = []);
        this.setState({ workouts: workoutList });
      });
  }

  componentWillUnmount() {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`users/${userId}/workouts/`)
      .off();
  }

  render() {
    return this.props.children(this.state);
  }
}

WorkoutsListener.propTypes = {};

export default WorkoutsListener;
