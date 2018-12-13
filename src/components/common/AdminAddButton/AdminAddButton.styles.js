import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';

export const AddButton = styled(Button)`
  ${props => {
    const { theme } = props;
    return css`
      padding: 10px 0px;
      box-shadow: ${theme.shadow};
    `;
  }}
`;

export const Icon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.white};
      margin: 0px 8px;
    `;
  }}
`;
