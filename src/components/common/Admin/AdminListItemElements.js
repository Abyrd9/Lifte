import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider } from '../Layout';

const AddIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.whte};
      margin-left: 5px;
      height: 8px;
    `;
  }}
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  ${props => {
    const { theme } = props;
    return css`
      color: ${theme.colors.error};
    `;
  }}
`;

const BlockContainerStyled = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      position: relative;
      display: flex;
      align-items: center;
      margin: 2px 0px;
      width: 100%;
    `;
  }}
`;

export const BlockContainer = ({ children }) => (
  <BlockContainerStyled>
    <BlockContainerStyled>{children}</BlockContainerStyled>
  </BlockContainerStyled>
);

const ListItemBlockStyled = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      h2 {
        ${theme.font(10, 400)};
        color: ${theme.colors.blackSecondary};
      }
      p {
        ${theme.font(18, 700)};
        color: ${theme.colors.black};
      }
      & ~ span {
        height: 25px;
        width: 2px;
        background-color: ${theme.colors.whiteSecondary};
        margin: 0px 8px;
      }
    `;
  }}
`;

export const ListItemBlock = ({ name, value, noSpan }) => (
  <React.Fragment>
    <ListItemBlockStyled>
      <h2>{name}</h2>
      <p>{value}</p>
    </ListItemBlockStyled>
    {!noSpan && <span />}
  </React.Fragment>
);

const ListItemSetsRepsStyled = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      h2 {
        ${theme.font(10, 400)};
        color: ${theme.colors.blackSecondary};
      }
      p {
        ${theme.font(18, 700)};
        color: ${theme.colors.black};
      }
      & ~ span {
        height: 25px;
        width: 2px;
        background-color: ${theme.colors.whiteSecondary};
        margin: 0px 8px;
      }
    `;
  }}
`;

export const ListItemSetsReps = ({ name, sets, reps, noSpan }) => (
  <React.Fragment>
    <ListItemSetsRepsStyled>
      <h2>Sets & Reps:</h2>
      <p>
        {sets}x{reps}
      </p>
    </ListItemSetsRepsStyled>
    {!noSpan && <span />}
  </React.Fragment>
);

const ListItemSessionsStyled = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      h2 {
        ${theme.font(10, 400)};
        color: ${theme.colors.blackSecondary};
        span {
          margin-left: 5px;
          ${theme.font(16, 700)};
          color: ${theme.colors.black};
        }
      }
    `;
  }}
`;

export const ListItemSessions = ({ name, value }) => (
  <ListItemSessionsStyled>
    <h2>
      {name}
      <span>{value}</span>
    </h2>
  </ListItemSessionsStyled>
);

const EditButtonStyled = styled.button`
  ${props => {
    const { theme } = props;
    return css`
      padding: 5px 10px;
      background-color: ${theme.colors.secondary};
      ${theme.font(10, 400)};
      color: ${theme.colors.white};
      box-shadow: ${theme.shadow};
      border-radius: 2px;
    `;
  }}
`;
export const EditButton = ({ onClick }) => (
  <EditButtonStyled onClick={onClick}>
    Edit
    <AddIcon icon="edit" />
  </EditButtonStyled>
);

const DeleteButtonStyled = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      flex: 1;
      display: flex;
      justify-content: flex-end;
      padding-right: 10px;
    `;
  }}
`;

export const DeleteButton = ({ onClick }) => (
  <DeleteButtonStyled>
    <DeleteIcon onClick={onClick} icon="minus-circle" />
  </DeleteButtonStyled>
);

const RoutineWorkoutListStyled = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      background-color: ${theme.colors.whiteSecondary};
      padding: 8px;
      p {
        ${theme.font(12, 400)};
        color: ${theme.colors.black};
      }
    `;
  }}
`;

export const RoutineWorkoutList = ({ name, children }) => (
  <RoutineWorkoutListStyled>
    <p>{name}</p>
    <Divider isDarker />
    {children}
  </RoutineWorkoutListStyled>
);

const RoutineWorkoutListItemStyled = styled.div`
  ${props => {
    const { theme } = props;
    return css`
      display: flex;
      align-items: flex-end;
      h2 {
        ${theme.font(16, 400)};
        color: ${theme.colors.black};
      }
      h1 {
        ${theme.font(16, 700)};
        color: ${theme.colors.black};
        margin-left: 3px;
      }
      span {
        width: 1px;
        height: 15px;
        background-color: ${theme.colors.blackSecondary};
        margin: 0px 5px;
        align-self: center;
      }
      p {
        ${theme.font(12, 400)};
        color: ${theme.colors.blackSecondary};
      }
    `;
  }}
`;

export const RoutineWorkoutListItem = ({ name, weight, sets, reps }) => (
  <React.Fragment>
    <RoutineWorkoutListItemStyled>
      <h2>{name} - </h2>
      <h1> {weight}lbs</h1>
      <span />
      <p>
        {sets}x{reps}
      </p>
    </RoutineWorkoutListItemStyled>
    <Divider isDarker />
  </React.Fragment>
);
