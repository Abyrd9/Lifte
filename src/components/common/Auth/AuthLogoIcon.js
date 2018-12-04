import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      background-color: ${theme.colors.white};
      width: 80px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      position: absolute;
      top: 15%;
      left: 0;
      right: 0;
      margin: 0 auto;
      box-shadow: ${theme.shadow};
    `;
  }}
`;

const Icon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.blackSecondary};
    `;
  }}
`;

const LogoIcon = ({}) => (
  <Container>
    <Icon icon="dumbbell" size="2x" />
  </Container>
);

export default LogoIcon;
