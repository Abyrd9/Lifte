import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

class RoutineListener extends Component {
  state = {
    routine: {}
  };

  componentDidMount() {
    const { routineId } = this.props;
    if (routineId) {
      this.handleSetListener(routineId);
    }
  }

  componentDidUpdate(prevProps) {
    const { routineId } = this.props;
    if (prevProps.routineId !== routineId) {
      if (prevProps.routineId) {
        this.handleRemoveListener(prevProps.routineId);
      }
      if (routineId) {
        this.handleSetListener(routineId);
      }
    }
  }

  componentWillUnmount() {
    const { routineId } = this.props;
    if (routineId) {
      this.handleRemoveListener(routineId);
    }
  }

  handleSetListener = routineId => {
    const auth = firebase.auth();
    if (!!auth.currentUser) {
      const userId = auth.currentUser.uid;
      firebase
        .database()
        .ref(`/users/${userId}/routines/${routineId}`)
        .on('value', snapshot => {
          let routine = snapshot.val();
          routine ? (routine = routine) : (routine = {});
          this.setState({ routine });
        });
    }
  };

  handleRemoveListener = routineId => {
    const auth = firebase.auth();
    if (!!auth.currentUser) {
      const userId = auth.currentUser.uid;
      firebase
        .database()
        .ref(`users/${userId}/routines/${routineId}`)
        .off();
    }
  };

  render() {
    return this.props.children(this.state);
  }
}

RoutineListener.propTypes = {
  routineId: PropTypes.string.isRequired
};

export default RoutineListener;
