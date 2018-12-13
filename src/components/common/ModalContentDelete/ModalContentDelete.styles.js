import styled, { css } from 'styled-components';

export const ModalContentDeleteContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      p {
        ${theme.font(18, 400)};
        color: ${theme.colors.black};
        text-align: left;
        margin: -2px 0px 20px 0px;
      }
    `;
  }}
`;
