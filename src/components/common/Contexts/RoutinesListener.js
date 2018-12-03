import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

class RoutinesListener extends Component {
  state = {
    routines: []
  };

  componentDidMount() {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/users/${userId}/routines/`)
      .on('value', snapshot => {
        let routineList = snapshot.val();
        routineList
          ? (routineList = Object.values(routineList))
          : (routineList = []);
        this.setState({ routines: routineList });
      });
  }

  componentWillUnmount() {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`users/${userId}/routines/`)
      .off();
  }

  render() {
    return this.props.children(this.state);
  }
}

RoutinesListener.propTypes = {};

export default RoutinesListener;
