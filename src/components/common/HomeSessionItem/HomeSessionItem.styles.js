import styled, { css } from 'styled-components';

export const HomeSessionItemContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
    `;
  }}
`;
