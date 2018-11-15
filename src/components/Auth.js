import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import AuthForm from './common/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LogoIcon = styled(FontAwesomeIcon)`${props => {
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

const AuthContainer = styled.div`${props => {
    const { theme } = props;
    console.log(theme);
    return css`
      height: 100vh;
      width: 100vw;
      position: relative;
      &:before {
        position: absolute;
        content: '';
        background-color: ${theme.colors.primary};
        top: 0;
        left: 0;
        height: 40%;
        width: 100%;
      }
    `
  }}
`


class Auth extends PureComponent {
  render() {
    return (
      <AuthContainer>
        <LogoIcon icon="dumbbell" size="2x" />
        <AuthForm />
      </AuthContainer>
    );
  }
}

export default Auth;