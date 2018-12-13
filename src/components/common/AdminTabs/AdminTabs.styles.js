import styled, { css } from 'styled-components';
import Button from '../Button';

export const TabContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
  }}
`;

export const TabButton = styled(Button)`
  ${props => {
    const { theme } = props;
    return css`
      &:first-child {
        margin-right: 5px;
      }
      &:last-child {
        margin-left: 5px;
      }
      ${!props.isActive &&
        `
				background-color: ${theme.colors.gray_light};
				color: ${theme.colors.black};
				box-shadow: ${theme.shadow};
			`}
      ${props.isActive &&
        `
				box-shadow: ${theme.shadow};
			`}
    `;
  }}
`;
