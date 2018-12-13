import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AdminItemEditButtonStyled = styled.button`
  ${props => {
    const { theme } = props;
    return css`
      padding: 5px 10px;
      background-color: ${theme.colors.secondary};
      ${theme.font(10, 400)};
      color: ${theme.colors.white};
      box-shadow: ${theme.shadow};
      border-radius: 2px;
    `;
  }}
`;

export const AddIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.whte};
      margin-left: 5px;
      height: 8px;
    `;
  }}
`;
