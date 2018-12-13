import styled, { css } from 'styled-components';

export const AdminTitleStyled = styled.h1`
  ${props => {
    const { theme } = props;
    return css`
      ${theme.font(20, 800)};
      color: ${theme.colors.black};
      text-align: center;
    `;
  }}
`;
