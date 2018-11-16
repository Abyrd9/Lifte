import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import TextInput from '../common/TextInput';
import Button from '../common/AuthButton';

const AuthFormContainer = styled.form`
  ${props => {
    const { theme } = props;
    return css`
      box-sizing: border-box;
      position: absolute;
      top: calc(40% - 20px);
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 95%;
      padding: 20px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      box-shadow: ${theme.shadow};
      p {
        font-size: 14px;
        color: ${theme.colors.offBlack};
        margin-bottom: 5px;
      }
    `;
  }}
`;

const AuthForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSignIn
}) => (
  <AuthFormContainer>
    <p>Sign In</p>
    <TextInput
      onChange={onEmailChange}
      value={email}
      type="email"
      placeholder="email"
    />
    <TextInput
      onChange={onPasswordChange}
      value={password}
      type="password"
      placeholder="password"
    />
    <Button onClick={onSignIn}>Sign In</Button>
  </AuthFormContainer>
);

export default AuthForm;
