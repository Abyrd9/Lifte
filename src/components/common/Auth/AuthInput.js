import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.blackSecondary};
      margin-right: 8px;
      height: 12px;
    `;
  }}
`;

const StyledLabel = styled.label`
  ${props => {
    const { theme } = props;
    return css`
      border-radius: 1px;
      margin: 5px 0px;
      background-color: ${theme.colors.whiteSecondary};
      padding: 8px;
      display: flex;
      align-items: center;
      span {
        height: 20px;
        width: 20px;
      }
      input {
        border: none;
        background-color: transparent;
        color: ${theme.colors.blackSecondary};
        font-size: 14px;
        flex: 1;
        &::placeholder {
          color: ${theme.colors.blackSecondary};
          font-size: 14px;
        }
        &:focus {
          outline: none;
        }
      }
    `;
  }}
`;

const AuthInput = ({
  name,
  type,
  value,
  placeholder,
  pattern,
  required,
  alt,
  onChange,
  onFocus,
  onBlur
}) => {
  let iconName = '';
  switch (type) {
    case 'email':
      iconName = 'envelope';
      break;
    case 'password':
      iconName = 'lock';
      break;
    default:
      iconName = '';
  }

  return (
    <StyledLabel>
      <Icon icon={iconName} size="1x" />
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        pattern={pattern}
        required={required}
        alt={alt}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </StyledLabel>
  );
};

export default AuthInput;
