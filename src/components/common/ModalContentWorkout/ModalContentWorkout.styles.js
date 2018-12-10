import styled, { css } from 'styled-components';

export const ModalContentWorkoutContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css``;
  }}
`;

export const ModalContentInputBlock = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
    `;
  }}
`;

export const ModalContentDivider = styled.span`
  ${props => {
    const { theme } = props;
    return css`
      margin: 0px 15px;
      display: block;
      height: 25px;
      width: 2px;
      align-self: center;
      background-color: ${theme.colors.gray_light};
    `;
  }}
`;
