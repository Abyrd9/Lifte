import React from 'react';
import styled, { css } from 'styled-components';
import Logo from '../../../images/LifteLogo.png';

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
      img {
        height: 50px;
      }
    `;
  }}
`;

const LogoIcon = ({}) => (
  <Container>
    <img src={Logo} alt="Lifte Logo" />
  </Container>
);

export default LogoIcon;
