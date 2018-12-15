import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const HomeSessionItemBlockContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 100%;
      }
    `;
  }}
`;

export const HomeSessionItemBlockSection = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      margin: 5px 0px;
      h1 {
        ${theme.font(20, 700)};
        color: ${theme.colors.black};
      }
      h2 {
        ${theme.font(20, 400)};
        color: ${theme.colors.black};
      }
      span {
        height: 20px;
        width: 1px;
        background-color: ${theme.colors.gray};
        margin: 0px 8px;
      }
      p {
        ${theme.font(14, 700)};
        color: ${theme.colors.gray};
      }
    `;
  }}
`;

export const CompletedIcon = styled.span`
  ${props => {
    const { theme } = props;
    return css`
      height: 20px;
      min-width: 20px;
      border-radius: 100%;
      border: 2px solid ${theme.colors.gray};
      background-color: ${theme.colors.white};
      position: relative;
      margin: 0px 5px 0px 20px;
      ${props.isCompleted &&
        css`
          background-color: ${theme.colors.secondary};
          &:after {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: 0 auto;
            height: 12px;
            width: 12px;
            background-color: ${theme.colors.secondary};
          }
        `}
    `;
  }}
`;

export const EditIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.primary};
      margin-left: 6px;
      margin-bottom: 4px;
      font-size: 12px;
    `;
  }}
`;
