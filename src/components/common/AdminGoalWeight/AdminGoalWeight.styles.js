import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AdminGoalWeightContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 8px 0px;
      div {
        h3 {
          ${theme.font(10, 700)};
          color: ${theme.colors.gray};
          text-align: left;
        }
        div {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          h1 {
            ${theme.font(48, 700)};
            color: ${theme.colors.secondary};
            margin: -5px 0px;
          }
          input {
            ${theme.font(48, 700)};
            color: ${theme.colors.secondary};
            background-color: transparent;
            border: none;
            border-bottom: 1px solid ${theme.colors.gray};
            max-width: 100px;
            padding-left: 8px;
            max-height: 55px;
          }
        }
      }
    `;
  }}
`;

export const EditIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.gray};
      font-size: 16px;
      margin-left: 6px;
      margin-bottom: 6px;
    `;
  }}
`;

export const SaveIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.primary};
      font-size: 16px;
      margin-left: 6px;
      margin-bottom: 6px;
    `;
  }}
`;
