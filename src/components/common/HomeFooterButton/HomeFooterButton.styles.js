import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Icon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.white};
    `;
  }}
`;

export const AddButton = styled.button`
  ${props => {
    const { theme } = props;
    return css`
      height: 50px;
      width: 50px;
      border-radius: 100%;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${theme.colors.primary};
      box-shadow: ${theme.shadow};
      z-index: ${theme.zIndex.top};
    `;
  }}
`;

export const Container = styled.div`
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 10px;
`;
