import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from './Auth';
import AuthContext from './AuthContext';
import Workout from './Workout';

const AuthenticatedRoute = ({ isAuthenticated, Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);

const NonAuthenticatedRoute = ({ isAuthenticated, Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Redirect
          to={{ pathname: '/workout', state: { from: props.location } }}
        />
      ) : (
        <component {...props} />
      )
    }
  />
);

class Routes extends Component {
  render() {
    return (
      <AuthContext>
        {auth => {
          console.log(auth);
          return (
            <Router>
              <React.Fragment>
                <NonAuthenticatedRoute
                  isAuthenticated={auth.isAuthenticated}
                  component={Auth}
                  path="/login"
                />
                <AuthenticatedRoute
                  isAuthenticated={auth.isAuthenticated}
                  component={Workout}
                  path="/workout"
                />
              </React.Fragment>
            </Router>
          );
        }}
      </AuthContext>
    );
  }
}

Routes.propTypes = {};

export default Routes;
