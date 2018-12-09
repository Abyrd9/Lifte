import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DeleteIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.error};
      margin-left: 5px;
    `;
  }}
`;

const NameInputStyled = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      margin: 8px 0px;
      h2 {
        ${theme.font(14, 700)};
        color: ${theme.colors.gray};
        text-align: left;
      }
      input {
        border: none;
        background-color: transparent;
        color: ${theme.colors.black};
        font-size: 16px;
        font-weight: 600;
        border-bottom: 2px solid ${theme.colors.gray};
        width: 100%;
        margin: 5px 0px;
        padding-bottom: 3px;
        &::placeholder {
          color: ${theme.colors.gray_light};
          font-size: 16px;
        }
        &:focus {
          outline: none;
        }
      }
    `;
  }}
`;

export const NameInput = ({ title, value, type, hasValue, placeholder, onChange }) => (
  <NameInputStyled>
    <h2>{title}</h2>
    <input
      value={value}
      type={type}
      hasValue={hasValue}
      placeholder={placeholder}
      onChange={onChange}
    />
  </NameInputStyled>
);

const NumberBlockStyled = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      margin: 8px 0px;
      h2 {
        ${theme.font(14, 700)};
        color: ${theme.colors.gray};
        text-align: left;
      }
      input {
        margin-left: 15px;
        border: none;
        background-color: transparent;
        color: ${theme.colors.black};
        font-size: 16px;
        font-weight: 600;
        max-width: 30px;
        max-height: 18px;
        border-bottom: 2px solid ${theme.colors.gray};
        margin: 5px 0px;
        padding-bottom: 3px;
        &::placeholder {
          color: ${theme.colors.gray_light};
          font-size: 16px;
        }
        &:focus {
          outline: none;
        }
      }
    `;
  }}
`;

export const NumberBlock = ({ title, value, type, hasValue, placeholder, onChange }) => (
  <NumberBlockStyled>
    <h2>{title}</h2>
    <input
      value={value}
      type={type}
      hasValue={hasValue}
      placeholder={placeholder}
      onChange={onChange}
    />
  </NumberBlockStyled>
);

const NumberSetsRepsStyled = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      margin: 8px 0px;
      h2 {
        ${theme.font(14, 700)};
        color: ${theme.colors.gray};
        text-align: left;
      }
      div {
        input {
          margin-left: 15px;
          border: none;
          background-color: transparent;
          color: ${theme.colors.black};
          font-size: 16px;
          font-weight: 600;
          max-width: 30px;
          max-height: 18px;
          border-bottom: 2px solid ${theme.colors.gray};
          margin: 5px 0px;
          padding-bottom: 3px;
          &::placeholder {
            color: ${theme.colors.gray_light};
            font-size: 16px;
          }
          &:focus {
            outline: none;
          }
        }
      }
    `;
  }}
`;

const Icon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.gray};
      margin: 0px 8px;
      height: 12px;
    `;
  }}
`;

export const NumberSetsReps = ({
  title,
  setValue,
  repValue,
  type,
  setHasValue,
  repHasValue,
  setPlaceholder,
  repPlaceholder,
  onSetChange,
  onRepChange
}) => (
  <NumberSetsRepsStyled>
    <h2>{title}</h2>
    <div>
      <input
        value={setValue}
        type={type}
        hasValue={setHasValue}
        placeholder={setPlaceholder}
        onChange={onSetChange}
      />
      <Icon icon="times" />
      <input
        value={repValue}
        type={type}
        hasValue={repHasValue}
        placeholder={repPlaceholder}
        onChange={onRepChange}
      />
    </div>
  </NumberSetsRepsStyled>
);

const RoutineWorkoutListItemStyled = styled.div`
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

export const RoutineWorkoutListItem = ({ name, onClick }) => (
  <RoutineWorkoutListItemStyled>
    {name}
    <DeleteIcon icon="minus-circle" onClick={onClick} />
  </RoutineWorkoutListItemStyled>
);

const RoutineWorkoutListStyled = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      display: flex;
      flex-wrap: wrap;
      margin: 10px 0px;
    `;
  }}
`;

export const RoutineWorkoutList = ({ children }) => (
  <RoutineWorkoutListStyled>{children}</RoutineWorkoutListStyled>
);
