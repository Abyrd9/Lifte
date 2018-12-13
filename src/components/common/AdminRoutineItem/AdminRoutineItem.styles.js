import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AdminRoutineItemContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
    `;
  }}
`;

export const AdminRoutineItemSection = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      position: relative;
      display: flex;
      align-items: center;
      margin: 5px 0px;
      width: 100%;
    `;
  }}
`;

export const DeleteIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.error};
      margin-left: auto;
      margin-right: 5px;
      font-size: 20px;
    `;
  }}
`;
