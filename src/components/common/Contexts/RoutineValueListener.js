import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

class RoutineValueListener extends Component {
  state = {
    value: null
  };

  setListener = (routineId, key) => {
    const userId = firebase.auth().currentUser.uid;
    const ref = !!key
      ? `/users/${userId}/routines/${routineId}/${key}`
      : `/users/${userId}/routines/${routineId}/`;
    firebase
      .database()
      .ref(ref)
      .on('value', snapshot => {
        let val = snapshot.val();
        this.setState({ value: val });
      });
  };

  removeListener = (routineId, key) => {
    const userId = firebase.auth().currentUser.uid;
    const ref = !!key
      ? `/users/${userId}/routines/${routineId}/${key}`
      : `/users/${userId}/routines/${routineId}/`;
    firebase
      .database()
      .ref(ref)
      .off();
  };

  componentDidMount() {
    const { routineId, key } = this.props;
    this.setListener(routineId, key);
  }

  componentDidUpdate(prevProps) {
    if (this.props.routineId !== prevProps.routineId) {
      this.removeListener(prevProps.routineId, this.props.key);
      this.setListener(this.props.routineId, this.props.key);
    }
  }

  componentWillUnmount() {
    const { routineId, key } = this.props;
    this.removeListener(routineId, key);
  }

  render() {
    return this.props.children(this.state);
  }
}

RoutineValueListener.propTypes = {};

export default RoutineValueListener;
