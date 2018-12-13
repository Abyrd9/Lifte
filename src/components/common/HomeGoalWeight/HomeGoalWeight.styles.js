import styled, { css } from 'styled-components';

export const HomeGoalWeightContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 8px 0px;
      h1 {
        ${theme.font(48, 700)};
        color: ${theme.colors.secondary};
      }
    `;
  }}
`;
