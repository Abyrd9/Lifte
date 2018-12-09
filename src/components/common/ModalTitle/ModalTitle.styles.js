import styled, { css } from 'styled-components';

export const ModalTitleContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      h1 {
        ${theme.font(20, 400)};
        color: ${theme.colors.black};
        text-align: left;
      }
      span {
        margin: 10px 0px;
        display: block;
        height: 2px;
        width: 80px;
        background-color: ${theme.colors.primary};
      }
    `;
  }}
`;
