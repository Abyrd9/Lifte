import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

class AuthContext extends Component {
  state = {
    isAuthenticated: false,
    user: {},
    userId: null,
    handleSignIn: (email, password) => this.handleSignIn(email, password)
  };

  handleSignIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => console.log(err.code, err.message));
  };

  authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ isAuthenticated: true, user, userId: user.uid });
      } else {
        this.setState({ isAuthenticated: false, user: {}, userId: null });
      }
    });
  };

  componentDidMount() {
    this.authListener();
  }

  componentWillUnmount() {
    this.authListener = null;
  }

  render() {
    return this.props.children(this.state);
  }
}

AuthContext.propTypes = {};

export default AuthContext;
