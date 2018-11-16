import styled, { css } from 'styled-components';

const Background = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      box-sizing: border-box;
      height: 100vh;
      width: 100vw;
      position: relative;
      padding: 20px 20px 0px 20px;
      overflow: scroll;
      z-index: ${theme.zIndex.default};
      &:before {
        position: absolute;
        content: '';
        background-color: ${theme.colors.primary};
        top: 0;
        left: 0;
        height: 40%;
        width: 100%;
        z-index: -1;
      }
    `;
  }}
`;

export default Background;
