import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LogoIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      background-color: ${theme.colors.white};
      padding: 15px;
      border-radius: 3px;
      position: absolute;
      top: 15%;
      left: 0;
      right: 0;
      margin: 0 auto;
      color: ${theme.colors.blackSecondary};
      box-shadow: ${theme.shadow};
    `;
  }}
`;

export default LogoIcon;
