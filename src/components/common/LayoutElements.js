import styled, { css } from 'styled-components';

export const Background = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      box-sizing: border-box;
      height: 100vh;
      width: 100vw;
      position: relative;
      padding: 55px 20px 0px 20px;
      overflow: scroll;
      z-index: ${theme.zIndex.default};
      margin-bottom: 60px;
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

export const Container = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      box-sizing: border-box;
      background-color: ${theme.colors.white};
      width: 100%;
      z-index: ${theme.zIndex.middle};
      box-shadow: ${theme.shadow};
      border-radius: 2px;
      padding: 10px;
      margin: 15px 0px;
    `;
  }}
`;

export const Divider = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: ${props.isHalf ? '50%' : '100%'};
      margin: 10px auto;
      height: 1px;
      background-color: ${props.isDarker ? theme.colors.gray : theme.colors.gray_light};
    `;
  }}
`;
