import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import AuthForm from './common/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth } from 'firebase';
import AuthContext from './AuthContext';
import Background from './common/Background';

const LogoIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      background-color: #fff;
      padding: 15px;
      border-radius: 3px;
      position: absolute;
      top: 15%;
      left: 0;
      right: 0;
      margin: 0 auto;
      color: ${theme.colors.offBlack};
      box-shadow: ${theme.shadow};
    `;
  }}
`;

class Auth extends PureComponent {
  state = {
    email: '',
    password: ''
  };
  render() {
    return (
      <Background>
        <LogoIcon icon="dumbbell" size="2x" />
        <AuthContext>
          {auth => (
            <AuthForm
              email={this.state.email}
              password={this.state.password}
              onEmailChange={e => this.setState({ email: e.target.value })}
              onPasswordChange={e =>
                this.setState({ password: e.target.value })
              }
              onSignIn={() =>
                auth.handleSignIn(this.state.email, this.state.password)
              }
            />
          )}
        </AuthContext>
      </Background>
    );
  }
}

export default Auth;
