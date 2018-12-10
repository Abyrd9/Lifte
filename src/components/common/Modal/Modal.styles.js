import styled, { css } from 'styled-components';

export const ModalStyledBackdrop = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      overflow: hidden;
      z-index: ${theme.zIndex.top};
    `;
  }}
`;

export const ModalStyledContent = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      box-sizing: border-box;
      width: 100%;
      background-color: ${theme.colors.white};
      padding: 15px;
    `;
  }}
`;
