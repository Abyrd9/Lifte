import styled, { css } from 'styled-components';

export const ModalButtonListContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin-top: 15px;
      button {
        ${theme.font(14, 400)};
        color: ${theme.colors.white};
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 125px;
        padding: 8px 0px;
        background-color: ${theme.colors.primary};
        border-radius: 3px;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.23);
        &:first-of-type: {
          margin-right: 15px;
        }
        &:disabled {
          background-color: ${theme.colors.gray_light};
          color: ${theme.colors.gray};
        }
        &:focus,
        :active {
          outline: none;
          box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.15);
        }
      }
    `;
  }}
`;
