import styled, { css } from 'styled-components';

export const ListItemBlockStyled = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      margin: 5px 0px;
      ${props.isInline &&
        css`
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
        `}
      h2 {
        ${theme.font(10, 400)};
        color: ${theme.colors.gray};
      }
      p {
        ${theme.font(18, 700)};
        color: ${theme.colors.black};
        ${props.isInline &&
          css`
            ${theme.font(16, 700)};
            margin-left: 5px;
          `}
      }
      & ~ span {
        height: 25px;
        width: 2px;
        background-color: ${theme.colors.gray_light};
        margin: 0px 8px;
      }
    `;
  }}
`;
