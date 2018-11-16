import React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  ${props => {
    const { theme } = props;
    return css`
      margin-top: 20px;
      padding: 8px 5px;
      color: #fff;
      border-radius: 2px;
      background-color: ${theme.colors.primary};
      a {
        color: #fff;
      }
    `;
  }}
`;

const AuthButton = ({ children, onClick }) => (
  <Button onClick={onClick}>{children}</Button>
);

export default AuthButton;
