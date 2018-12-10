import styled, { css } from 'styled-components';

export const ModalDoubleInputContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      margin: 10px 0px;
      h3 {
        ${theme.font(14, 700)};
        color: ${theme.colors.gray};
        text-align: left;
        margin-bottom: 3px;
      }
      label {
        width: 100%;
        display: flex;
        align-items: flex-end;
        input {
          flex: 1;
          ${theme.font(18, 400)};
          color: ${theme.colors.black};
          background-color: transparent;
          border: none;
          border-bottom: 1px solid ${theme.colors.gray};
          max-width: 30px;
          padding-left: 3px;
          padding-bottom: 2px;
          &:placeholder {
            color: ${theme.colors.gray_light};
          }
          &:focus {
            outline: none;
          }
        }
        span {
          ${theme.font(16, 700)};
          color: ${theme.colors.gray};
          align-self: center;
          padding-bottom: 6px;
          margin: 0px 3px;
        }
        p {
          ${theme.font(10, 400)};
          color: ${theme.colors.gray};
          margin-left: 3px;
        }
      }
    `;
  }}
`;
