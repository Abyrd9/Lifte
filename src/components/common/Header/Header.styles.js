import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const HeaderContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 15px;
      display: flex;
      justify-content: ${props.hasBackButton ? 'space-between' : 'flex-end'};
      align-items: center;
      button {
        ${theme.font(14, 600)};
        background-color: ${theme.colors.white};
        border-radius: 2px;
        padding: 5px 8px;
        position: absolute;
        right: 40px;
        top: 12px;
        color: ${theme.colors.black};
        transition: ${theme.transition('all', 0.2)};
        transform: ${props.isOpen ? 'translateX(0)' : 'translate(10px)'};
        opacity: ${props.isOpen ? '1' : '0'};
      }
    `;
  }}
`;

export const UserIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.white};
      font-size: 22px;
    `;
  }}
`;

export const ArrowIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.white};
      font-size: 22px;
    `;
  }}
`;
