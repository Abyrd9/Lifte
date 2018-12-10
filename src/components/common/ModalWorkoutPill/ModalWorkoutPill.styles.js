import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ModalWorkoutPillContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      ${theme.font(14, 700)};
      border-radius: 50px;
      background-color: ${theme.colors.gray_light};
      color: ${theme.colors.black};
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 10px;
      margin: 3px;
    `;
  }}
`;

export const ModalPillDeleteIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.error};
      margin-left: 5px;
    `;
  }}
`;
