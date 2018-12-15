import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TimerSection = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;
      h1 {
        ${theme.font(54, 700)};
        color: ${theme.colors.black};
        position: relative;
        margin-top: -5px;
      }
      p {
        ${theme.font(10, 700)};
        color: ${theme.colors.gray};
        margin-top: -5px;
      }
    `;
  }}
`;

export const TimerButton = styled.button`
  ${props => {
    const { theme } = props;
    return css`
      display: block;
      width: 100%;
      max-width: 120px;
      padding: 10px 0px;
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};
      border-radius: 3px;
      box-shadow: ${theme.shadow};
      margin-left: auto;
      &:disabled {
        box-shadow: none;
        background-color: ${theme.colors.gray_light};
        color: ${theme.colors.gray};
      }
    `;
  }}
`;

export const TimerButtonContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 8px;
    `;
  }}
`;

export const TimerIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.gray_light};
      position: absolute;
      font-size: 20px;
      top: 10px;
      left: -22px;
    `;
  }}
`;

export const CancelTimerIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.error};
      font-size: 28px;
      margin-left: 15px;
    `;
  }}
`;
