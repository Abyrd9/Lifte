import styled, { css } from 'styled-components';

export const ModalInputContainer = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      width: ${props.maxTwo || props.maxThree ? 'auto' : '100%'};
      margin: 10px 0px;
      h3 {
        ${theme.font(14, 700)};
        color: ${theme.colors.gray};
        text-align: left;
        margin-bottom: 3px;
      }
      label {
        width: 100%;
        display: flex;
        align-items: flex-end;
        input {
          flex: 1;
          ${theme.font(18, 400)};
          color: ${theme.colors.black};
          background-color: transparent;
          border: none;
          border-bottom: 1px solid ${theme.colors.gray};
          padding-bottom: 2px;
					padding-left: ${props.maxTwo || props.maxThree ? '3px' : '0px'};
					${props.maxTwo && `max-width: 30px;`}
					${props.maxThree && `max-width: 40px;`} 
          ${props.isWeight &&
            `
						padding-left: 3px;
						max-width: 30px;
					`}
          &:placeholder {
            color: ${theme.colors.gray_light};
          }
          &:focus {
            outline: none;
          }
        }
        p {
          ${theme.font(16, 400)};
          color: ${theme.colors.gray};
          margin-left: 3px;
        }
      }
    `;
  }}
`;
