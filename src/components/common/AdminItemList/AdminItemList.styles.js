import styled, { css } from 'styled-components';

export const AdminItemListContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      padding: 5px 10px;
      margin: 10px 0px;
      background-color: ${theme.colors.gray_light};
      h1 {
        ${theme.font(14, 400)};
        color: ${theme.colors.black};
        text-align: left;
        margin: 5px 0px;
        margin-bottom: 8px;
      }
    `;
  }}
`;

export const AdminItemListItem = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 8px 0px;
      h2 {
        ${theme.font(18, 400)};
        color: ${theme.colors.black};
      }
      h3 {
        ${theme.font(18, 700)};
        color: ${theme.colors.black};
        margin-left: 3px;
      }
      span {
        display: inline-block;
        background-color: ${theme.colors.gray};
        height: 18px;
        width: 2px;
        margin: 0px 5px;
      }
      p {
        ${theme.font(14, 700)};
        color: ${theme.colors.gray};
      }
    `;
  }}
`;
