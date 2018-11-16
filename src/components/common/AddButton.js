import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: #fff;
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
      position: absolute;
      top: calc(100% - 50px);
      left: calc(100% - 50px);
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${theme.colors.primary};
      box-shadow: ${theme.shadow};
    `;
  }}
`;

const AddButton = ({ onClick, icon }) => {
  return (
    <Button onClick={onClick}>
      <Icon icon={icon} size="1x" />
    </Button>
  );
};

export default AddButton;
