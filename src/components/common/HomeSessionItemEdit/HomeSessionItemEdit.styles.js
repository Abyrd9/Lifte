import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const HomeSessionItemEditContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 10px 0px;
    `;
  }}
`;

export const HomeSessionItemEditSection = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: 100%;
      &:nth-of-type(1) {
        flex: 2;
      }
      &:nth-of-type(2) {
        flex: 1;
      }
    `;
  }}
`;

export const TitleSection = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      h1 {
        ${theme.font(20, 700)};
        color: ${theme.colors.black};
      }
      div {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        margin: 5px 0px;
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
      }
    `;
  }}
`;

export const SetsSection = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      h3 {
        margin-top: 4px;
        margin-right: 3px;
        ${theme.font(16, 700)};
        color: ${theme.colors.gray};
      }
      div {
        margin: 5px 0px;
        display: flex;
        flex-wrap: wrap;
      }
    `;
  }}
`;

export const CompletedButton = styled.button`
  ${props => {
    const { theme } = props;
    return css`
      height: 28px;
      width: 28px;
      border-radius: 3px;
      border: solid 2px ${theme.colors.gray};
      margin: 0px 10px 5px 0px;
      position: relative;
      ${props.isComplete &&
        css`
          border: solid 2px ${theme.colors.secondary};
          &:after {
            content: '';
            position: absolute;
            height: 20px;
            width: 20px;
            border-radius: 3px;
            background-color: ${theme.colors.secondary};
            top: calc(50% - 10px);
            left: 0;
            right: 0;
            margin: 0 auto;
          }
        `}
    `;
  }}
`;

export const EditButton = styled.button`
  ${props => {
    const { theme } = props;
    return css`
      padding: 5px 10px;
      background-color: ${theme.colors.secondary};
      ${theme.font(10, 400)};
      color: ${theme.colors.white};
      box-shadow: ${theme.shadow};
      border-radius: 2px;
      display: block;
      margin-top: 10px;
      margin-left: auto;
    `;
  }}
`;

export const EditIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.whte};
      margin-left: 5px;
      height: 8px;
    `;
  }}
`;
