import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from './Auth';
import AuthContext from './contexts/AuthContext';
import Home from './Home';
import Admin from './Admin';

const AuthenticatedRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }
  />
);

const NonAuthenticatedRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

class Routes extends Component {
  render() {
    return (
      <AuthContext>
        {auth => {
          return (
            <Router>
              <React.Fragment>
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <NonAuthenticatedRoute
                  isAuthenticated={auth.isAuthenticated}
                  component={Auth}
                  path="/login"
                />
                <AuthenticatedRoute
                  isAuthenticated={auth.isAuthenticated}
                  component={Home}
                  path="/home"
                />
                <AuthenticatedRoute
                  isAuthenticated={auth.isAuthenticated}
                  component={Admin}
                  path="/admin"
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
