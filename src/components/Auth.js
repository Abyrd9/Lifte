import React, { PureComponent } from 'react';
import { Background } from './common/LayoutElements';
import AuthContext from './contexts/AuthContext';
import AuthLogoIcon from './common/Auth/AuthLogoIcon';
import AuthForm from './common/Auth/AuthForm';

class Auth extends PureComponent {
  state = {
    email: '',
    password: ''
  };
  render() {
    return (
      <Background>
        <AuthLogoIcon icon="dumbbell" size="2x" />
        <AuthContext>
          {auth => (
            <AuthForm
              email={this.state.email}
              password={this.state.password}
              onEmailChange={e => this.setState({ email: e.target.value })}
              onPasswordChange={e => this.setState({ password: e.target.value })}
              onSignIn={() => auth.handleSignIn(this.state.email, this.state.password)}
            />
          )}
        </AuthContext>
      </Background>
    );
  }
}

export default Auth;
