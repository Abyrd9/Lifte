import styled, { css } from 'styled-components';

export const HomeButtonListContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin: 15px auto;
    `;
  }}
`;

export const HomeButtonListItem = styled.button`
  ${props => {
    const { theme } = props;
    return css`
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      box-shadow: ${theme.shadow};
			background-color: ${theme.colors.white};
			color: ${theme.colors.gray};
			${props.isComplete &&
        css`
          background-color: ${theme.colors.secondary_light};
          color: ${theme.colors.gray};
        `}
			${props.isActive &&
        css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.white};
        `}
      ${theme.font(18, 600)};
      margin: 5px 5px;
    `;
  }}
`;
