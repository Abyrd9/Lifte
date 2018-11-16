import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      margin-top: 10px;
      color: ${theme.colors.black};
      display: flex;
      align-items: center;
      justify-content: space-between;
      h1 {
        ${theme.font(18, 600)};
      }
      p {
        ${theme.font(18, 400)};
      }
    `;
  }}
`;

const Divider = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 90%;
      margin: 15px auto;
      height: 2px;
      background-color: ${theme.colors.offBlack};
    `;
  }}
`;

const GoalWeight = ({ weight }) => (
  <React.Fragment>
    <Container>
      <h1>Goal Weight:</h1>
      <p>{weight}lbs</p>
    </Container>
    <Divider />
  </React.Fragment>
);

export default GoalWeight;
