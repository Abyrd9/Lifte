import styled, { css } from 'styled-components';

export const ModalDoubleInputContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
      margin: 10px 0px;
      h3 {
        ${theme.font(14, 700)};
        color: ${theme.colors.gray};
        text-align: left;
      }
      label {
        width: 100%;
        display: flex;
        align-items: flex-end;
        input {
          flex: 1;
          ${theme.font(16, 400)};
          color: ${theme.colors.black};
          background-color: transparent;
          border: none;
          border-bottom: 1px solid ${theme.colors.gray};
          max-width: 30px;
          padding-bottom: 3px;
          &:placeholder {
            color: ${theme.colors.gray_light};
          }
          &:focus {
            outline: none;
          }
        }
        span {
          ${theme.font(16, 400)};
          color: ${theme.colors.gray};
          align-self: center;
        }
        p {
          ${theme.font(10, 400)};
          color: ${theme.colors.gray};
        }
      }
    `;
  }}
`;
