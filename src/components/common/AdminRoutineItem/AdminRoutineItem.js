import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AdminRoutineItemContainer,
  AdminRoutineItemSection,
  DeleteIcon
} from './AdminRoutineItem.styles';
import AdminItemBlock from '../AdminItemBlock/AdminItemBlock';
import AdminItemEditButton from '../AdminItemEditButton/AdminItemEditButton';
import AdminItemList from '../AdminItemList/AdminItemList';

const AdminRoutineItem = ({ routine, onEditClick, onDeleteClick }) => {
  const { name, sessionLength, workouts } = routine;
  return (
    <AdminRoutineItemContainer>
      <AdminRoutineItemSection>
        <AdminItemBlock title="Name:" value={name} />
        <AdminItemEditButton onClick={onEditClick} />
        <DeleteIcon icon="minus-circle" onClick={onDeleteClick} />
      </AdminRoutineItemSection>
      <AdminItemBlock title="# of Sessions:" value={sessionLength} noSpan isInline />
      <AdminItemList workouts={workouts} />
    </AdminRoutineItemContainer>
  );
};

AdminRoutineItem.propTypes = {
  routine: PropTypes.oneOfType({
    currentSession: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    routineId: PropTypes.string.isRequired,
    sessionLength: PropTypes.string.isRequired,
    workouts: PropTypes.oneOfType([
      {
        name: PropTypes.string.isRequired,
        startingWeight: PropTypes.string.isRequired,
        sessions: PropTypes.oneOfType([
          {
            sets: PropTypes.string.isRequired,
            reps: PropTypes.string.isRequired
          }
        ]),
        workoutId: PropTypes.string.isRequired
      }
    ])
  }),
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default AdminRoutineItem;
