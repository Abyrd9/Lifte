import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DropdownButton = styled.button`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 8px;
      background-color: ${theme.colors.gray_light};
      color: ${props.hasValue ? theme.colors.black : theme.colors.gray};
      ${theme.font(14, 400)};
      position: relative;
    `;
  }}
`;

export const DropdownList = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      box-sizing: border-box;
      position: absolute;
      top: calc(100% + 5px);
      left: 0;
      width: 100%;
      background-color: ${theme.colors.white};
      box-shadow: ${theme.shadow};
      transition: opacity 0.2s ${theme.ease}, transform 0.2s ${theme.ease},
        visibility 0s linear 0.2s;
      visibility: hidden;
      transform: translateY(-5px);
      opacity: 0;
      max-height: 250px;
      overflow-y: scroll;
      z-index: ${theme.zIndex.top};
      button {
        width: 100%;
        display: block;
        text-align: left;
        padding: 15px 10px;
        border-bottom: 1px solid ${theme.colors.gray_light};
        color: ${theme.colors.black};
        ${theme.font(14, 400)};
        &:last-child {
          border: none;
        }
      }
      ${props.isOpen &&
        `
				transition: visibility 0s linear, opacity .2s ${theme.ease}, transform .2s ${theme.ease};
				visibility: visible;
				transform: translateY(0);
				opacity: 1;
			`}
    `;
  }}
`;

export const DropdownIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.gray};
      margin-right: 8px;
      height: 16px;
      max-width: 15px;
    `;
  }}
`;
