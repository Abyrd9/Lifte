import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.white};
    `;
  }}
`;

const Button = styled.button`
  ${props => {
    const { theme } = props;
    return css`
      height: 40px;
      width: 40px;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${theme.colors.primary};
      box-shadow: ${theme.shadow};
    `;
  }}
`;

const FooterButton = ({ onClick, disabled, icon, size, className }) => {
  return (
    <Button disabled={disabled} className={className} onClick={onClick}>
      <Icon icon={icon} size={size} />
    </Button>
  );
};

export default FooterButton;
