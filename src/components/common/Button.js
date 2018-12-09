import React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  ${props => {
    const { theme } = props;
    return css`
      ${props.isFullWidth
        ? `
				width: 100%;
				margin: 10px 0px;
			`
        : `
				flex: 1;
				width: auto;
				margin: 10px 5px;
			`}
      padding: 8px 5px;
      color: ${theme.colors.white};
      border-radius: 2px;
      background-color: ${props.isSecondary ? theme.colors.secondary : theme.colors.primary};
      a {
        color: ${theme.colors.white};
      }
      &:disabled {
        background-color: ${theme.colors.gray_light};
        color: ${theme.colors.gray};
      }
    `;
  }}
`;

const AuthButton = ({ children, onClick, disabled, isSecondary, isFullWidth, className }) => (
  <Button
    isSecondary={isSecondary}
    isFullWidth={isFullWidth}
    disabled={disabled}
    onClick={onClick}
    className={className}>
    {children}
  </Button>
);

export default AuthButton;
